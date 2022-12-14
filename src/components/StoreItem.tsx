import React from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { DocumentData } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../store/slices/shoppingCartSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type StoreItemProps =
  | DocumentData
  | {
      id: number;
      name: string;
      price: number;
      imgUrl: string;
    };

export const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.shoppingCart);

  const quantity = cartItems.find((item) => item.id === id)?.quantity || 0;

  const handleChangeQuantity = (
    changeCartQuantity: ActionCreatorWithPayload<any, string>
  ) => {
    dispatch(changeCartQuantity({ id }));
  };

  return (
    <Card className={"h-100"}>
      <Card.Img
        variant={"top"}
        src={imgUrl}
        height={"200px"}
        style={{ objectFit: "cover" }}
      />
      <Card.Body className={"d-flex flex-column"}>
        <Card.Title
          className={"d-flex justify-content-between align-items-baseline mb-2"}
        >
          <span className={"fs-2"}>{name}</span>
          <span className={"ms-2 text-muted"}>{formatCurrency(price)}</span>
        </Card.Title>
        <div className={"mt-auto"}>
          {quantity === 0 ? (
            <Button
              className={"w-100"}
              onClick={() => {
                handleChangeQuantity(increaseCartQuantity);
              }}
            >
              Add To Cart
            </Button>
          ) : (
            <div
              className={"d-flex align-items-center flex-column"}
              style={{ gap: ".5rem" }}
            >
              <div
                className={"d-flex align-items-center justify-content-center"}
                style={{ gap: ".5rem" }}
              >
                <Button
                  onClick={() => {
                    handleChangeQuantity(decreaseCartQuantity);
                  }}
                >
                  -
                </Button>
                <div>
                  <span className={"fs-3"}>{quantity}</span> in cart
                </div>
                <Button
                  onClick={() => {
                    handleChangeQuantity(increaseCartQuantity);
                  }}
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => {
                  handleChangeQuantity(removeFromCart);
                }}
                variant={"danger"}
                size={"sm"}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
