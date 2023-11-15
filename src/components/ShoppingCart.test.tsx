import { describe, test, beforeEach, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";

describe("Shopping Cart", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  });
  test("shopping cart modal is closed initially", () => {
    const shoppingCartModal = screen.queryByTestId("shopping-cart-modal");
    expect(shoppingCartModal).toBeNull();
  });
  test("show 'Close' button in the shopping cart", () => {
    const shoppingCartButton = screen.getByTestId("shopping-cart-btn");
    fireEvent.click(shoppingCartButton as HTMLElement);
    const closeModalBtn = screen.getByLabelText("Close");
    expect(closeModalBtn).toBeDefined();
  });
});
