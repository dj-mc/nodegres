import cors from "cors";
import express from "express";

import auth_router from "./routers/auth-router.mjs";
import home_router from "./routers/home-router.mjs";
import todo_router from "./routers/todo-router.mjs";

const app = express();

app.use(cors()); // Share resources cross-origin
app.use(express.json()); // Access req.body with json data
app.use("/auth", auth_router); // Authenticate login/register
app.use("/home", home_router); // Authorize access to home page
app.use(todo_router); // Operations on todo_item SQL table

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
