import { RegisterForm } from "../components/RegisterForm";
import "../styles/register.sass";

export const Register = () => {
  return (
    <div className="pages register">
      <h1 className="register-title">Register</h1>
      <RegisterForm />
    </div>
  );
};
