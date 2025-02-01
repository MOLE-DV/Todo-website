const User = require("./models/User");
const errorHandler = require("./errorHandler");

const getbyemail = async (req, res) => {
  const email = req.headers["email"];
  if (!email)
    return res
      .status(errorHandler.EmailNotProvidedError.code)
      .json({ error: errorHandler.EmailNotProvidedError.error });

  await User.getByEmail(email)
    .then((user) => res.status(200).json(user))
    .catch((error) =>
      res
        .status(errorHandler.UserNotFound.code)
        .json(errorHandler.UserNotFound.error)
    );
};

module.exports = getbyemail;
