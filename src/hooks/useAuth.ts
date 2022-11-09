import React from "react";
import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
