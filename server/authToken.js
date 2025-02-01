const { sign, verify } = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();
const errorHandler = require("./errorHandler");

const authToken = {
  createTokens: (user) => {
    const accessToken = sign(
      { username: user.username, id: user.u_id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    const refreshToken = sign(
      { username: user.username, id: user.u_id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  },
  validateToken: async (req, res, next) => {
    const accessToken = req.cookies["accessToken"];

    if (!accessToken)
      return res
        .status(errorHandler.AccessTokenNotProvided.code)
        .json({ error: errorHandler.AccessTokenNotProvided.error });
    try {
      const validToken = verify(accessToken, process.env.JWT_SECRET);
      if (!validToken) throw "Access Token is invalid.";

      res.username = validToken.username;
      return next();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
  getNewAccessToken: (req, res, next) => {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken)
      return res
        .status(errorHandler.TokenExpiredError.code)
        .json({ error: errorHandler.TokenExpiredError.error });

    try {
      const validToken = verify(refreshToken, process.env.JWT_SECRET);
      if (!validToken) throw "Refresh token is invalid";

      const accessToken = sign(
        { username: validToken.username, id: validToken.id },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );

      return res.json(accessToken);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },
};

module.exports = authToken;
