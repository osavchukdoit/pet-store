import { capitalizeString } from "./formatText";
import { describe, expect, test } from "vitest";

describe("capitalizeString()", () => {
  test("capitalize", () => {
    expect(capitalizeString("foo")).toBe("Foo");
  });
  test("capitalize only first word", () => {
    expect(capitalizeString("foo bar")).toBe("Foo bar");
  });
});
