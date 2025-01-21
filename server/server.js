const express = require("express");
const cors = require("cors");
const port = 8081;
const bcrypyt = require("bcrypt");
const User = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser.json());

app.get("/getusers", async (req, res) => {
  await User.getAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json(`Failed to fetch users:${error}`));
});

app.get("/getbyemail", async (req, res) => {
  const email = req.headers["email"];
  if (!email)
    return res.status(400).json({ error: "Email hasn't been provided." });

  await User.getByEmail(email)
    .then((user) => res.status(200).json(user))
    .catch((error) =>
      res.status(404).json({ error: `User not found:${error}` })
    );
});

app.get("/getbyusername", async (req, res) => {
  const username = req.headers["username"];
  if (!username)
    return res.status(400).json({ error: "Username hasn't been provided." });

  await User.getByUsername(username)
    .then((user) => res.status(200).json(user))
    .catch((error) =>
      res.status(404).json({ error: `User not found:${error}` })
    );
});

app.post("/register", (req, res) => {
  const { name, surname, email, username, password } = req.body;
  console.log(name, surname, email, username, password);
  if (!name || !surname || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypyt.hash(password, 10).then(async (hash) => {
    await User.create(name, surname, username, email, hash)
      .then((newUser) => res.status(201).json(newUser))
      .catch((error) => res.status(500).json(`Failed to create user:${error}`));
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.getByUsername(username);

  if (!username)
    return res.status(400).json({ error: "Username hasn't been provided." });
  if (!password)
    return res.status(400).json({ error: "Password hasn't been provided." });
  if (!user) return res.status(400).json({ error: "User doesn't exist." });

  const db_pass = user.password;

  bcrypyt.compare(password, db_pass).then((match) => {
    switch (match) {
      case true:
        res.json("LOGGED IN");
        break;
      case false:
        res.status(400).json({ error: "Wrong username or password." });
        break;
    }
  });
});

app.get("/", (req, res) => {
  return res.json("Server is ok.");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
