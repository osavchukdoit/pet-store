import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import { AppNavbar } from "./AppNavbar";

describe("Navigation Bar", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AppNavbar />
        </Provider>
      </MemoryRouter>
    );
  });
  test("nav to Store screen", () => {
    const btnLinkStore = screen.getByRole("link", { name: "Store" });
    fireEvent.click(btnLinkStore);
    const storeScreen = screen.queryByTestId("store-screen");
    expect(storeScreen).toBeDefined();
  });
  test("nav to Tracker screen", () => {
    const btnLinkTracker = screen.getByRole("link", { name: "Tracker" });
    fireEvent.click(btnLinkTracker);
    const trackerScreen = screen.queryByTestId("tracker-screen");
    expect(trackerScreen).toBeDefined();
  });
  test("nav to About screen", () => {
    const btnLinkAbout = screen.getByRole("link", { name: "About" });
    fireEvent.click(btnLinkAbout);
    const aboutScreen = screen.queryByTestId("about-screen");
    expect(aboutScreen).toBeDefined();
  });
});
