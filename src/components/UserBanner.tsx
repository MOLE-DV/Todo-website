import { Icon } from "./Icon";
import user_icon from "../assets/icons/user.svg";
import settings_icon from "../assets/icons/settings.svg";
import "../styles/userBanner.sass";
import { IconButton } from "./IconButton";
import { Link } from "react-router-dom";

export const UserBanner = () => {
  const isLoggedIn = localStorage.getItem("token") ? true : false;
  return (
    <div className="user-banner">
      <Icon source={user_icon} className="user-icon" />
      <h3 className="user-username">
        {!isLoggedIn ? (
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
          "Username"
        )}
      </h3>
      <IconButton className="user-banner-settings" source={settings_icon} />
    </div>
  );
};
