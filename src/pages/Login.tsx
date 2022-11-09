import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/Login";

export const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <div className={"d-flex justify-content-center"}>
        <LoginForm>
          <p>
            Or <Link to={"/register"}>register</Link>
          </p>
        </LoginForm>
      </div>
    </div>
  );
};
