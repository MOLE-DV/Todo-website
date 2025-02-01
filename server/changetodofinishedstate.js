const pool = require("./db");
const errorHandler = require("./errorHandler");

const changeTodoFinishedState = async (req, res) => {
  const { finished, t_id } = req.body;
  if (finished == undefined)
    return res
      .status(errorHandler.TaskStateNotProvidedError.code)
      .json({ error: errorHandler.TaskStateNotProvidedError.error });
  if (t_id == undefined)
    return res
      .status(errorHandler.TaskIdNotProvidedError.code)
      .json({ error: errorHandler.TaskIdNotProvidedError.error });

      
  const query = "UPDATE todos SET finished = $1 where t_id = $2";
  const values = [finished, t_id];
  await pool.query(query, values);
  return res.json(`Set state of t_id = [${t_id}] to [${finished}]`);
};

module.exports = changeTodoFinishedState;
