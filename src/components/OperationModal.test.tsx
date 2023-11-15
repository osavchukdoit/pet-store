import { describe, test, beforeEach, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import App from "../App";

describe("Tracker Modal window", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const btnLinkTracker = screen.getByRole("link", { name: "Tracker" });
    fireEvent.click(btnLinkTracker);
  });
  test("hide operation modal initially", () => {
    const operationForm = screen.queryByTestId("operation-form");
    expect(operationForm).toBeNull();
  });
  test("show operation modal after click 'Add operation'", () => {
    const addOperationButton = screen.getByRole("button", {
      name: "Add operation",
    });
    fireEvent.click(addOperationButton);
    const operationForm = screen.getByTestId("operation-form");
    expect(operationForm).toBeDefined();
  });
});
