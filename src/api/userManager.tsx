import axios from "axios";

const serverUrl = "http://localhost:8081";

const Regexs = {
  name: new RegExp(/^[a-z]{3,23}$/, "i"),
  surname: new RegExp(/^[a-z]{3,25}$/, "i"),
  username: new RegExp(/^[a-zA-Z0-9_]{5,25}$/),
  email: new RegExp(/^[a-zA-Z0-9\.\-_]+@+[\w\-]{2,10}\.[\w]{2,}$/),
  password: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-\.+=?]).{8,25}$/
  ),
};

export const getUsers = async () => {
  return await axios
    .get(`${serverUrl}/getUsers`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const register = async (userData: {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
}) => {
  try {
    if (
      !Regexs.name.test(userData.name) ||
      !Regexs.surname.test(userData.surname) ||
      !Regexs.username.test(userData.username) ||
      !Regexs.password.test(userData.password) ||
      !Regexs.email.test(userData.email)
    )
      throw "Fields need to fit certain requirments.";

    const user = await axios.post(`${serverUrl}/register`, userData);

    return user.data;
  } catch (error) {
    console.error("There was an error registering user:", error);
    throw error;
  }
};

export const getUserByEmail = async (header: { email: string }) => {
  try {
    if (!header.email) throw "Email field cannot be empty.";
    const user = await axios.get(`${serverUrl}/getbyemail`, {
      headers: { email: header.email },
    });
    return user.data;
  } catch (error) {
    console.error("Couldn't get user by email:", error);
    throw error;
  }
};

export const getByUsername = async (header: { username: string }) => {
  try {
    if (!header.username) throw "Username field cannot be empty.";
    const user = await axios.get(`${serverUrl}/getbyusername`, {
      headers: { username: header.username },
    });
    return user.data;
  } catch (error) {
    console.error("Coulnd't get user by username:", error);
    throw error;
  }
};
