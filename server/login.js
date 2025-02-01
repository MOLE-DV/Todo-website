const User = require("./models/User");
const bcrypt = require("bcrypt");
const authToken = require("./authToken");
const errorHandler = require("./errorHandler");

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.getByUsername(username);

  if (!username)
    return res
      .status(errorHandler.UsernameNotProvidedError.code)
      .json({ error: errorHandler.UsernameNotProvidedError.error });
  if (!password)
    return res
      .status(errorHandler.PasswordNotProvidedError.code)
      .json({ error: errorHandler.PasswordNotProvidedError.error });
  if (!user)
    return res
      .status(errorHandler.UserNotFound.code)
      .json({ error: errorHandler.UserNotFound.error });

  const db_pass = user.password;

  bcrypt.compare(password, db_pass).then((match) => {
    switch (match) {
      case true:
        const Tokens = authToken.createTokens(user);

        res.cookie("accessToken", Tokens.accessToken);
        res.cookie("refreshToken", Tokens.refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 2592000000, //30d
        });
        res.json({ ...user, accessToken: Tokens.accessToken });
        break;
      case false:
        res
          .status(errorHandler.WrongCredentials.code)
          .json({ error: errorHandler.WrongCredentials.error });
        break;
    }
  });
};

module.exports = login;
