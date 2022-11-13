import cors from "cors";
import express from "express";

import db_pool from "./db.mjs";

const app = express();

app.use(cors());
app.use(express.json()); // Access req.body with json data

app.get("/all", async (req, res) => {
  try {
    const all_todo_items = await db_pool.query("SELECT * FROM todo_item");
    res.json(all_todo_items);
  } catch (err) {
    console.error(err);
  }
});

app.get("/info", async (req, res) => {
  try {
    const all_todo_items = await db_pool.query(
      "SELECT description FROM todo_item"
    );
    res.json(all_todo_items.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/todo_item/:todo_id", async (req, res) => {
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

app.post("/todo_list", async (req, res) => {
  const { description, important, more_info } = req.body;

  try {
    const new_todo_item = await db_pool.query(
      "INSERT INTO todo_item (description, important, more_info) VALUES ($1, $2, $3) RETURNING *",
      [description, important, more_info]
    );

    res.json(new_todo_item);
  } catch (err) {
    console.log(err);
  }
});

app.put("/todo_item/:todo_id", async (req, res) => {
  // Update description of todo_item
  const { todo_id } = req.params; // WHERE
  const { description, important, more_info } = req.body; // SET

  try {
    const updated_todo_item = await db_pool.query(
      "UPDATE todo_item SET description = $1, important = $2, more_info = $3 WHERE todo_id = $4",
      [description, important, more_info, todo_id]
    );

    console.dir(updated_todo_item, { colors: true });
    res.json(`Updated description of todo_item matching todo_id: ${todo_id}`);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/todo_item/:todo_id", async (req, res) => {
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

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
