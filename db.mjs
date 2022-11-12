import pg from "pg";

const db_pool = new pg.Pool({
  user: "postgres",
  password: "postgres",
  database: "todo_list_db",
  host: "localhost",
  port: 5432,
});

export default db_pool;
