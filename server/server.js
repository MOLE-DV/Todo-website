const express = require("express");
const cors = require("cors");
const port = 8081;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const getusers = require("./getusers");
const getbyemail = require("./getbyemail");
const getbyusername = require("./getbyusername");
const register = require("./register");
const login = require("./login");
const authToken = require("./authToken");
const User = require("./models/User");
const errorHandler = require("./errorHandler");
const gettodos = require("./gettodos");
const changeTodoFinishedState = require("./changetodofinishedstate");
const validateTodoOwnership = require("./validateTodoOwnership");
const removeTodo = require("./removeTodo");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/getusers", getusers);

app.get("/getbyemail", getbyemail);

app.get("/getbyusername", getbyusername);

app.post("/register", register);

app.post("/login", login);

app.get("/user", authToken.validateToken, async (req, res) => {
  const username = res.username;
  const user = await User.getByUsername(username);
  if (!user)
    return res
      .status(errorHandler.UserNotFound.code)
      .json({ error: errorHandler.UserNotFound.error });
  res.json({
    u_id: user.u_id,
    name: user.name,
    surname: user.surname,
    username: user.username,
    email: user.email,
  });
});

app.get("/todos", gettodos);

app.post(
  "/changeTodoState",
  authToken.validateToken,
  validateTodoOwnership,
  changeTodoFinishedState
);

app.delete(
  "/removeTodo",
  authToken.validateToken,
  validateTodoOwnership,
  removeTodo
);
app.get("/getNewAccessToken", authToken.getNewAccessToken);

app.get("/", (req, res) => {
  return res.json("Server is ok.");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
