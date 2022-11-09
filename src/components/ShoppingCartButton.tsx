import React from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { openCart } from "../store/slices/shoppingCartSlice";

export const ShoppingCartButton = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.shoppingCart);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  return (
    <Button
      onClick={() => dispatch(openCart())}
      variant={"outline-primary"}
      style={{ width: "3rem", height: "3rem" }}
      className={"rounded-circle position-relative"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-cart-fill"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
      <div
        className={
          "rounded-circle bg-danger d-flex justify-content-center align-items-center position-absolute"
        }
        style={{
          width: "1.5rem",
          height: "1.5rem",
          color: "white",
          bottom: 0,
          right: 0,
          transform: "translate(25%, 25%)",
          fontSize: ".8rem",
        }}
      >
        {cartQuantity}
      </div>
    </Button>
  );
};
