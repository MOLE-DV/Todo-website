import axios from "axios";
import Cookies from "js-cookie";
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
      return "FieldsFormatError";

    if (
      (await getByUsername({ username: userData.username })) ||
      (await getUserByEmail({ email: userData.email }))
    ) {
      return "UserAlreadyExists";
    }

    const user = await axios.post(`${serverUrl}/register`, userData);

    return user.data;
  } catch (error) {
    console.error("There was an error registering user:", error);
    throw error;
  }
};

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const status = await axios.post(`${serverUrl}/login`, userData, {
      withCredentials: true,
    });

    return status.data;
  } catch (error) {
    if (
      ["UserNotFound", "WrongCredentials"].includes(
        error.response.data.error.name
      )
    ) {
      return error.response.data.error.name;
    } else {
      console.error("There was an error siging in:", error.response.data);
      throw error;
    }
  }
};

export const logout = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.reload();
};

export const getUserByEmail = async (header: { email: string }) => {
  try {
    if (!header.email) throw "Email field cannot be empty.";
    const user = await axios.get(`${serverUrl}/getbyemail`, {
      headers: { email: header.email },
    });
    return user.data;
  } catch (error) {
    console.error("Couldn't get user by email:", error.response.data);
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
    console.error("Coulnd't get user by username:", error.response.data);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const newAccessToken = await axios.get(`${serverUrl}/getNewAccessToken`, {
      withCredentials: true,
    });
    return newAccessToken.data;
  } catch (error) {
    console.error(
      "Couldn't generate new access token:",
      error.response.data.error
    );
    throw error;
  }
};

const getUserFromToken = async () => {
  try {
    const user = await axios.get(`${serverUrl}/user`, {
      withCredentials: true,
    });
    return user.data;
  } catch (error) {
    return error.response.data.error.name;
  }
};

export const getUser = async () => {
  try {
    let res = await getUserFromToken();
    console.log(res);
    switch (res) {
      case "AccessTokenNotProvided":
        return null;
      case "TokenExpiredError":
        const refreshedToken = await refreshToken();
        Cookies.set("accessToken", refreshedToken);
        const user = await getUserFromToken();
        return user;
      case "UserNotFound":
        Cookies.remove("accessToken");
        return null;
      case "WrongCredentials":
        return "wrongcredentials";
      default:
        return res;
    }
  } catch (error) {
    console.error("Couldn't get user:", error.response.data);
    throw error;
  }
};
