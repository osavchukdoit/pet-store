import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";

describe("Cart Item", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  });
  test("hide cart item initially", () => {
    const cartItem = screen.queryByTestId("cart-item");
    expect(cartItem).toBeNull();
  });
  test("cart items after click cart button", () => {
    const shoppingCartButton = screen.getByTestId("shopping-cart-btn");
    fireEvent.click(shoppingCartButton as HTMLElement);
    const cartItem = screen.queryByTestId("cart-item");
    expect(cartItem).toBeNull();
  });
});
