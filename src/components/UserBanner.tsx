import { Icon } from "./Icon";
import user_icon from "../assets/icons/profile.png";
import settings_icon from "../assets/icons/settings.svg";
import "../styles/userBanner.sass";
import { IconButton } from "./IconButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../api/userManager";

interface userDataI {
  u_id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export const UserBanner = () => {
  const userSessionOnly = JSON.parse(sessionStorage.getItem("user") as string);
  const [user, setUser] = useState<userDataI | null>(
    userSessionOnly ? userSessionOnly : null
  );
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (JSON.stringify(user) != JSON.stringify(userSessionOnly)) {
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    };
    fetchUser();
  }, [setUser]);
  return (
    <div className={`user-banner ${user ? "loggedin" : ""}`}>
      {user ? <Icon source={user_icon} className="user-icon" /> : null}
      <h3 className="user-username">
        {!user ? (
          <div className="login-box">
            <Link to={"/login"} className="login-box-buttons login">
              Login
            </Link>
            {"  "}
            <Link to={"/register"} className="login-box-buttons register">
              Register
            </Link>
          </div>
        ) : (
          <div>
            {user.username}
            <IconButton
              className="user-banner-sign-out-button"
              onClick={logout}
              icon={<Icon name="sign-out" />}
            />
          </div>
        )}
      </h3>
    </div>
  );
};
