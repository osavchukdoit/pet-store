import reducer, { initialState, removeUser, setUser } from "./userSlice";
import { describe, expect, test } from "vitest";

describe("userSlice Reducer", () => {
  test("return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  test("handle login", () => {
    expect(
      reducer(
        initialState,
        setUser({ email: "email@gmail.com", id: 0, token: "token" })
      )
    ).toEqual({ email: "email@gmail.com", id: 0, token: "token" });
  });
  test("remove user", () => {
    expect(reducer(initialState, removeUser())).toEqual(initialState);
  });
});
