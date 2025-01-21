const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const token = sign(
    { username: user.username, id: user.u_id },
    process.env.JWT_SECRET
  );
};
