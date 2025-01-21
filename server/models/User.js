const pool = require("../db");

const Regexs = {
  name: new RegExp(/^[a-z]{3,23}$/, "i"),
  surname: new RegExp(/^[a-z]{3,25}$/, "i"),
  username: new RegExp(/^[a-zA-Z0-9_]{5,25}$/),
  email: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/),
};

const User = {
  create: async (name, surname, username, email, password) => {
    if (
      !Regexs.name.test(name) ||
      !Regexs.surname.test(surname) ||
      !Regexs.username.test(username) ||
      !Regexs.email.test(email)
    )
      throw "Fields doesn't fit specified requirments.";

    const query =
      "INSERT INTO users (name, surname, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const values = [name, surname, email, username, password];

    try {
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  },
  getAll: async () => {
    const query = "SELECT * FROM users";
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (err) {
      throw err;
    }
  },
  getByEmail: async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    try {
      const res = await pool.query(query, [email]);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  },
  getByUsername: async (username) => {
    const query = "SELECT * FROM users WHERE username = $1";
    try {
      const res = await pool.query(query, [username]);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  },
};

module.exports = User;
