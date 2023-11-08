import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("App component test", () => {
  test("should show title all the time", () => {
    render(<h4>testing</h4>);

    expect(screen.getByText(/testing/i)).toBeDefined();
  });
  test("render navbar", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    // screen.debug();
    const navBar = screen.getByTestId("nav-bar");
    expect(navBar).toBeDefined();
  });
});
