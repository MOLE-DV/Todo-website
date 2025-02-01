const bcrypt = require("bcrypt");
const User = require("./models/User");

const register = async (req, res) => {
  const { name, surname, email, username, password } = req.body;
  if (!name || !surname || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create(name, surname, username, email, hash)
      .then((newUser) => res.status(201).json(newUser))
      .catch((error) => res.status(500).json(`Failed to create user:${error}`));
  });
};

module.exports = register;
