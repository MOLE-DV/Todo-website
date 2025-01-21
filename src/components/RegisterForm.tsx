import { useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import React from "react";
import { getRandomPerson } from "../functions/randomPerson";
import { getUserByEmail, getByUsername, register } from "../api/userManager";
import { useNavigate } from "react-router-dom";

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
      const userByEmail = await getUserByEmail({ email: data.email });
      const userByUsername = await getByUsername({ username: data.username });
      if (userByEmail || userByUsername) throw "User already exists.";
      const res: {
        u_id: string;
        name: string;
        surname: string;
        email: string;
        username: string;
        password: string;
      } = await register(data);
      console.log(res);
      navigate(-1);
    } catch (error) {
      console.error(`Registration failed: ${error}`);
    }
  };

  return (
    <form className="register-form" onSubmit={submitHandler}>
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
      <input className="register-form-submit" type="submit" value="Submit" />
    </form>
  );
};
