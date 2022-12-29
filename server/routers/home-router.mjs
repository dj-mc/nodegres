import express from "express";

import authorize from "../middleware/authorize.mjs";
import db_pool from "../db.mjs";

const home_router = express.Router();

home_router.get("/", authorize, async (req, res) => {
  try {
    const user = await db_pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.user_id]
    );
    return res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default home_router;
