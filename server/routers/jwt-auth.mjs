import bcrypt from "bcrypt";
import express from "express";

import db_pool from "../db.mjs";

const auth_router = express.Router();

auth_router.post("/register", async (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  try {
    const user = await db_pool.query(
      // Check if requested user already exists
      "SELECT * FROM users WHERE user_email = $1",
      [user_email]
    );

    if (user.rows.length > 0) {
      // Found more than zero rows matching query,
      // so user already exists.
      return res.status(401).send("User already exists");
    }

    // Salt password for 10 rounds
    // Increment > 10 if Moore's law concerns you
    const hashed_password = await bcrypt.hash(user_password, 10);

    if (hashed_password) {
      await db_pool.query(
        // Insert newly registered user into `users` table
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [user_name, user_email, hashed_password]
      );
      return;
    }

    throw new Error("Couldn't complete registration");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default auth_router;
