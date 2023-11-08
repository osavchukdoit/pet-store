import { formatCurrency } from "./formatCurrency";
import { describe, expect, test } from "vitest";

describe("formatCurrency(number)", () => {
  test("integer", () => {
    expect(formatCurrency(1)).toBe("$1.00");
  });
  test("millions", () => {
    expect(formatCurrency(1000000)).toBe("$1,000,000.00");
  });
  test("decimals", () => {
    expect(formatCurrency(123.45)).toBe("$123.45");
  });
  test("fixed", () => {
    expect(formatCurrency(123.45678)).toBe("$123.46");
  });
  test("zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });
  test("negative", () => {
    expect(formatCurrency(-230)).toBe("-$230.00");
  });
});
