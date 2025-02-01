import { useContext, useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import React from "react";
import { getRandomPerson } from "../functions/randomPerson";
import { login } from "../api/userManager";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PopupContext } from "../contexts/PopupContext";
import { userI } from "../interfaces/interfaces";

interface userDataI {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [data, setData] = useState<userDataI | null>(null);
  const [placeholders] = useState(getRandomPerson());
  const navigate = useNavigate();
  const { setPopupState } = useContext(PopupContext);

  const inputHandler = (name: string, value: string) => {
    setData(
      (prevData) =>
        ({
          ...prevData,
          [name]: value,
        } as userDataI)
    );
  };
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!data) throw "Failed to login user. Form fields cannot be empty.";
      const res: userI | string = await login(data);
      if (typeof res === "string") {
        switch (res) {
          case "UserNotFound":
            setPopupState({
              hidden: false,
              title: "User doesn't exist",
              descritpion: "User with this username doesn't exist.",
            });
            break;
          case "WrongCredentials":
            setPopupState({
              hidden: false,
              title: "Wrong username or password",
              descritpion: "username or password is invalid.",
            });
        }
      } else {
        Cookies.set("accessToken", res.accessToken);
        navigate("/");
        window.location.reload();
        setPopupState({
          hidden: false,
          title: "Logged in",
          descritpion: `Successfuly logged in as ${res.username}`,
        });
      }
    } catch (error) {
      console.error(`Login failed:`, error);
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <h1 className="title">Login</h1>
      <FormInput
        placeholder={placeholders.username}
        type="text"
        label="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          inputHandler("username", e.currentTarget.value)
        }
        required
      />
      <FormInput
        minLength={8}
        maxLength={25}
        type="password"
        label="Password"
        placeholder={placeholders.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          inputHandler("password", e.currentTarget.value)
        }
        required
      />
      <input className="form-submit" type="submit" value="Submit" />
    </form>
  );
};
