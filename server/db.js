const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "2006",
  host: "localhost",
  database: "todo_app",
  port: 5432,
});

module.exports = pool;
