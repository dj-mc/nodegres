import express from "express";

import db_pool from "../db.mjs";

const todo_router = express.Router();

todo_router.get("/all", async (req, res) => {
  try {
    const all_todo_items = await db_pool.query("SELECT * FROM todo_item");

    res.json(all_todo_items.rows);
  } catch (err) {
    console.error(err);
  }
});

todo_router.get("/descriptions", async (req, res) => {
  try {
    const all_todo_items = await db_pool.query(
      "SELECT description FROM todo_item"
    );

    res.json(all_todo_items.rows);
  } catch (err) {
    console.error(err);
  }
});

todo_router.get("/todo_item/:todo_id", async (req, res) => {
  const { todo_id } = req.params;

  try {
    const item_from_id = await db_pool.query(
      `SELECT * FROM todo_item WHERE todo_id = ${todo_id}`
    );

    res.json(item_from_id.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

todo_router.post("/todo_list", async (req, res) => {
  let { important } = req.body;
  if (important === null) important = false;
  const { description, more_info, tags } = req.body;

  try {
    const new_todo_item = await db_pool.query(
      "INSERT INTO todo_item (description, important, more_info, tags) VALUES ($1, $2, $3, $4) RETURNING *",
      [description, important, more_info, tags]
    );

    res.json(new_todo_item);
  } catch (err) {
    console.error(err);
  }
});

todo_router.put("/todo_item/:todo_id", async (req, res) => {
  const { todo_id } = req.params; // WHERE
  const { description, important, more_info, tags } = req.body; // SET

  try {
    // Update a todo_item's data via its todo_id
    const updated_todo_item = await db_pool.query(
      "UPDATE todo_item SET description = $1, important = $2, more_info = $3, tags = $4 WHERE todo_id = $5",
      [description, important, more_info, tags, todo_id]
    );

    console.dir(updated_todo_item, { colors: true });
    res.json(`Updated todo_item matching todo_id: ${todo_id}`);
  } catch (err) {
    console.error(err);
  }
});

todo_router.delete("/todo_item/:todo_id", async (req, res) => {
  const { todo_id } = req.params;

  try {
    const deleted_todo_item = await db_pool.query(
      "DELETE FROM todo_item WHERE todo_id = $1",
      [todo_id]
    );

    console.dir(deleted_todo_item, { colors: true });
    res.json(`Deleted todo_item matching todo_id: ${todo_id}`);
  } catch (err) {
    console.error(err);
  }
});

export default todo_router;
