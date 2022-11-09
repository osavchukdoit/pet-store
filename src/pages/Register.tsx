import React from "react";
import { Link } from "react-router-dom";
import { SignUp } from "../components/SignUp";

export const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <div className={"d-flex justify-content-center"}>
        <SignUp>
          <p>
            Already registered? <Link to={"/login"}>Sign in</Link>{" "}
          </p>
        </SignUp>
      </div>
    </div>
  );
};
