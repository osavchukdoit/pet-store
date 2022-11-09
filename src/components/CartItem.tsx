import React from "react";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { removeFromCart } from "../store/slices/shoppingCartSlice";

type CartItemProps = {
  id: number;
  quantity: number;
};

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.storeItems);

  const item = items.find((item) => item.id === id);

  if (!item) return null;

  return (
    <Stack
      direction={"horizontal"}
      gap={2}
      className={"d-flex align-items-center"}
    >
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ width: "100px", height: "75px", objectFit: "cover" }}
      />
      <div className={"me-auto"}>
        <div>
          {item.name}{" "}
          {quantity > 0 && (
            <span className={"text-muted"} style={{ fontSize: ".8rem" }}>
              x {quantity}
            </span>
          )}
        </div>
        <div className={"text-muted"} style={{ fontSize: ".8rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        onClick={() => dispatch(removeFromCart({ id }))}
        variant={"outline-danger"}
        size={"sm"}
      >
        &times;
      </Button>
    </Stack>
  );
};
