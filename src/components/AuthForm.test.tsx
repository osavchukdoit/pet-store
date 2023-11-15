import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";

describe("Auth Form", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
  });
  test("hide Auth form initially", () => {
    const authForm = screen.queryByTestId("auth-form");
    expect(authForm).toBeNull();
  });
  test("show Auth form after click 'Log In'", () => {
    const btnLogin = screen.getByTestId("btn-log-in-out");
    fireEvent.click(btnLogin);
    const authForm = screen.queryByTestId("auth-form");
    expect(authForm).toBeDefined();
  });
});
