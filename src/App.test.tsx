import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("App component test", () => {
  test("should show title all the time", () => {
    render(<h4>testing</h4>);

    expect(screen.getByText(/testing/i)).toBeDefined();
  });
  test("render navbar", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    // screen.debug();
    const navBar = screen.getByTestId("nav-bar");
    expect(navBar).toBeDefined();
  });
});
