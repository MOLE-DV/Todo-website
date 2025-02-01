const { verify } = require("jsonwebtoken");
require("dotenv").config();
const errorHandler = require("./errorHandler");
const pool = require("./db");

const validateTodoOwnership = async (req, res, next) => {
  const accessToken = req.cookies["accessToken"];
  const t_id = req.body["t_id"];

  if (!accessToken)
    return res
      .status(errorHandler.AccessTokenNotProvided.code)
      .json({ error: errorHandler.AccessTokenNotProvided.error });

  if (t_id == undefined)
    return res
      .status(errorHandler.TaskIdNotProvidedError.code)
      .json({ error: errorHandler.TaskIdNotProvidedError.error });

  try {
    const validatedToken = verify(accessToken, process.env.JWT_SECRET);

    //if reponse is equal to 1 then the user is owner of the todo
    const user_todo_id = await pool.query(
      `SELECT t_id, user_id FROM todos WHERE user_id = $1 AND t_id = $2`,
      [validatedToken.id, t_id]
    );

    if (user_todo_id.rows.length !== 1)
      return res
        .status(errorHandler.TodoOwnershipError.code)
        .json({ error: errorHandler.TodoOwnershipError.error });
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = validateTodoOwnership;
