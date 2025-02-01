const User = require("./models/User");
const errorHandler = require("./errorHandler");

const getbyusername = async (req, res) => {
  const username = req.headers["username"];
  if (!username)
    return res
      .status(errorHandler.UsernameNotProvidedError.code)
      .json({ error: errorHandler.UsernameNotProvidedError.error });

  await User.getByUsername(username)
    .then((user) => res.status(200).json(user))
    .catch((error) =>
      res
        .status(errorHandler.UserNotFound.code)
        .json({ error: errorHandler.UserNotFound.error })
    );
};

module.exports = getbyusername;
