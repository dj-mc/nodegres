import cors from "cors";
import express from "express";

import auth_router from "./routers/auth-router.mjs";
import todo_router from "./routers/todo-router.mjs";

const app = express();

app.use(cors()); // Share resources cross-origin
app.use(express.json()); // Access req.body with json data
app.use("/auth", auth_router);
app.use(todo_router);

app.listen(5000, () => {
  console.log("Listening to port 5000");
});
