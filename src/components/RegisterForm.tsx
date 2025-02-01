import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FormInput } from "./FormInput";
import React from "react";
import { getRandomPerson } from "../functions/randomPerson";
import {
  getUserByEmail,
  getByUsername,
  register,
  login,
} from "../api/userManager";
import { useNavigate } from "react-router-dom";
import { PopupContext } from "../contexts/PopupContext";

interface userDataI {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [data, setData] = useState<userDataI | null>(null);
  const [placeholders] = useState(getRandomPerson());
  const { setPopupState } = useContext(PopupContext);
  const navigate = useNavigate();

  const Regexs = {
    name: "^[a-zA-Z]{3,23}$",
    surname: "^[a-zA-Z]{3,25}$",
    username: "^[a-zA-Z0-9_]{5,25}$",
    email: "^[a-zA-Z0-9\\.\\-_]+@+[\\w\\-]{2,10}\\.[\\w]{2,}$",
    password:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\\-\\.+=?]).{8,25}$",
  };

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
      if (!data) throw "Failed to register user. Form fields cannot be empty.";
      const registerRes = await register(data);
      switch (registerRes) {
        case "UserAlreadyExists":
          setPopupState({
            hidden: false,
            title: "User already exists",
            descritpion: "User with this email or username already exists.",
          });
          return;
        case "FieldsFormatError":
          setPopupState({
            hidden: false,
            title: "Wrong format",
            descritpion: "Make sure the fields are in correct format.",
          });
          return;
      }
      const res = await login({
        username: data.username,
        password: data.password,
      });
      Cookies.set("accessToken", res.accessToken);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(`Registration failed: ${error}`);
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <h1 className="title">Sign Up</h1>
      <FormInput
        placeholder={placeholders.name}
        type="text"
        label="Name(s)"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          inputHandler("name", e.currentTarget.value)
        }
        minLength={3}
        maxLength={23}
        pattern={Regexs.name}
        required
      />
      <FormInput
        placeholder={placeholders.surname}
        type="text"
        label="Surname"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          inputHandler("surname", e.currentTarget.value)
        }
        minLength={3}
        maxLength={25}
        pattern={Regexs.surname}
        required
      />
      <FormInput
        placeholder={placeholders.username}
        type="text"
        label="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          inputHandler("username", e.currentTarget.value)
        }
        pattern={Regexs.username}
        onInvalid={(e) =>
          e.currentTarget.setCustomValidity(
            "Username lenght should be between 5 - 25 and contain letters and numbers"
          )
        }
        required
      />
      <FormInput
        type="email"
        label="E-mail"
        maxLength={320}
        placeholder={placeholders.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          inputHandler("email", e.currentTarget.value)
        }
        pattern={Regexs.email}
        onInvalid={(e) =>
          e.currentTarget.setCustomValidity(
            "E-mail address should look like example@domain.ex"
          )
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
        pattern={Regexs.password}
        onInvalid={(e) =>
          e.currentTarget.setCustomValidity(
            "Password lenght should be between 8 - 25, contain at least one uppercase and one lowercase letter, numbers or these special characters !, @, #, $, %, ^, &, *, _, -, ., +, =, ?"
          )
        }
        required
      />
      <input className="form-submit" type="submit" value="Submit" />
    </form>
  );
};
