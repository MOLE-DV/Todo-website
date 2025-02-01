const pool = require("./db");
const errorHandler = require("./errorHandler");

const removeTodo = async (req, res) => {
  const t_id = req.body["t_id"];

  if (t_id == undefined)
    return res
      .status(errorHandler.TaskIdNotProvidedError.code)
      .json({ error: errorHandler.TaskIdNotProvidedError.error });
  try {
    await pool.query("DELETE FROM todos WHERE t_id = $1", [t_id]);
    return res.json(`Deleted todo of id [${t_id}].`);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = removeTodo;
