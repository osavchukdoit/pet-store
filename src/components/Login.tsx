import React from "react";
import { setUser } from "../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import firebase from "firebase/compat";
import OAuthCredential = firebase.auth.OAuthCredential;

interface LoginFormProps {
  children?: React.ReactElement;
}

export const LoginForm: React.FC<LoginFormProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (login: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        const { user } = userCredential;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: (user as unknown as OAuthCredential).accessToken,
          })
        );
        navigate("/store");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AuthForm title={"Sign In"} handleClick={handleLogin} children={children} />
  );
};
