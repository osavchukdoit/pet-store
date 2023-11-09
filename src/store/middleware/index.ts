import { ListenerMiddleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const logger: ListenerMiddleware = (store) => (next) => (action) => {
  console.info("action=", action);
  console.info("before", store.getState());
  const result = next(action);
  console.info("after", store.getState());
  return result;
};

export const notifier: ListenerMiddleware = (store) => (next) => (action) => {
  const { type } = action;
  if (type === "shoppingCart/increaseCartQuantity") {
    toast.success("Added to cart");
  }
  if (type === "shoppingCart/decreaseCartQuantity") {
    toast.info("Decreased quantity");
  }
  if (type === "shoppingCart/removeFromCart") {
    toast.warn("Removed from cart");
  }
  return next(action);
};
