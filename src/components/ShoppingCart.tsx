import React, { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { closeCart, setCartItems } from "../store/slices/shoppingCartSlice";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserCart } from "../api/useUserCart";

export const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { isOpen, cartItems } = useAppSelector((state) => state.shoppingCart);
  const { isAuth } = useAuth();
  const [localStorageCart, setLocalStorageCart] = useLocalStorage(
    "shopping-cart",
    cartItems
  );
  const [getUserCart, setUserCart] = useUserCart();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const totalPrice = cartItems.reduce((total, currItem) => {
    const item = storeItems.find((storeItem) => storeItem.id === currItem.id);
    return total + (item?.price || 0) * currItem.quantity;
  }, 0);
  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  useEffect(() => {
    if (!isAuth) {
      dispatch(setCartItems(localStorageCart));
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      getUserCart().then(() => {
        setIsUserLoaded(true);
      });
    }
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth) {
      setLocalStorageCart(cartItems);
      return;
    }
    if (isUserLoaded) {
      setUserCart(cartItems);
    }
  }, [isAuth, cartItems]);

  return (
    <Offcanvas show={isOpen} onHide={handleCloseCart} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.length ? (
            cartItems.map((item) => <CartItem {...item} key={item.id} />)
          ) : (
            <span>Empty</span>
          )}
          <div className={"ms-auto fw-bold fs-2"}>
            Total: {formatCurrency(totalPrice)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
