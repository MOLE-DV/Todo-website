const User = require("./models/User");
const errorHandler = require("./errorHandler");

const getusers = async (req, res) => {
  await User.getAll()
    .then((users) => res.status(200).json(users))
    .catch((error) =>
      res
        .status(errorHandler.UsersFetchingError.code)
        .json({ error: errorHandler.UsersFetchingError.error })
    );
};

module.exports = getusers;
