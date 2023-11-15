import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore, store } from "../store";
import App from "../App";
import { setUser } from "../store/slices/userSlice";

describe("Login Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
  });
  test("show Login button", () => {
    const btnLogin = screen.getByTestId("btn-log-in-out");
    expect(btnLogin).toBeDefined();
    expect(btnLogin).toMatchSnapshot();
  });
  test("show Log Out", () => {
    const store = setupStore();
    store.dispatch(
      setUser({ email: "email@gmail.com", id: 0, token: "token" })
    );
    const btnLogin = screen.getByTestId("btn-log-in-out");
    fireEvent.click(btnLogin);
    const modalWindow = screen.findByText("Log Out");
    expect(modalWindow).toBeDefined();
  });
});
