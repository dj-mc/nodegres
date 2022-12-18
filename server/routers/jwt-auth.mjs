import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import db_pool from "../db.mjs";

const auth_router = express.Router();

function jwt_sign_user_id(id) {
  return jwt.sign(
    { user: { user_id: id } },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60,
    }
  );
}

auth_router.post("/register", async (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  try {
    const duplicate_user = await db_pool.query(
      // Check if requested user already exists
      "SELECT * FROM users WHERE user_email = $1",
      [user_email]
    );

    if (duplicate_user.rows.length > 0) {
      // Found more than zero rows matching query,
      // so user already exists.
      return res.status(401).send("User already exists");
    }

    // Salt password for 10 rounds
    // Increment > 10 if Moore's law concerns you
    const hashed_password = await bcrypt.hash(user_password, 10);

    if (hashed_password) {
      const pending_user = await db_pool.query(
        // Insert newly registered user into `users` table
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [user_name, user_email, hashed_password]
      );
      // Generate user login session token
      const token = jwt_sign_user_id(pending_user.rows[0].user_id)
      return res.json({ token });
    }

    throw new Error("Couldn't complete registration");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

auth_router.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    // Retrieve user from db
    const user = await db_pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [user_email]
    );

    // Database query failed to find a valid user
    if (user.rows.length === 0) {
      return res.status(401).send("Incorrect credentials");
    }

    // Validate login credentials
    const compared_password = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );

    if (!compared_password) {
      return res.status(401).send("Incorrect credentials");
    } else {
      // Generate user login session token
      const token = jwt_sign_user_id(user.rows[0].user_id)
      return res.json({ token });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default auth_router;
