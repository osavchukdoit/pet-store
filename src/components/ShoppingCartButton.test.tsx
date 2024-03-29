import { describe, test, beforeEach, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";

describe("Shopping Cart button", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
  });
  test("the button is visible", () => {
    const shoppingCartButton = screen.getByTestId("shopping-cart-btn");
    expect(shoppingCartButton).toBeDefined();
  });
  test("open shopping cart after click", () => {
    const shoppingCartButton = screen.getByTestId("shopping-cart-btn");
    fireEvent.click(shoppingCartButton as HTMLElement);
    const shoppingCartModal = screen.getByTestId("shopping-cart-modal");
    expect(shoppingCartModal).toBeDefined();
  });
});
