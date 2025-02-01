const { verify } = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const pool = require("./db");
require("dotenv").config();

const gettodos = async (req, res) => {
  const accessToken = req.cookies["accessToken"];
  try {
    const validateToken = verify(accessToken, process.env.JWT_SECRET);
    if (!validateToken) {
      return res
        .status(errorHandler.InvalidToken.code)
        .json({ error: errorHandler.InvalidToken.error });
    }

    const query = "SELECT * FROM todos WHERE user_id = $1";
    const values = [validateToken.id];

    const todos = await pool.query(query, values);

    return res.json(todos.rows);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = gettodos;
