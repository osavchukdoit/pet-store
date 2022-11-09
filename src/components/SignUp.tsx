import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthForm } from "./AuthForm";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import firebase from "firebase/compat";
import OAuthCredential = firebase.auth.OAuthCredential;

interface SignUpProps {
  children?: React.ReactElement;
}

export const SignUp: React.FC<SignUpProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignUp = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
    <AuthForm
      title={"Register"}
      handleClick={handleSignUp}
      children={children}
    />
  );
};
