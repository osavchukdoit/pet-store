import reducer, {
  initialState,
  CartItem,
  setCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} from "./shoppingCartSlice";
import { describe, expect, test } from "vitest";

const mockCartItems: CartItem[] = [
  { id: 1, quantity: 1 },
  { id: 2, quantity: 2 },
];

describe("shoppingCartSlice Reducer", () => {
  test("return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  test("set cart items", () => {
    expect(reducer(initialState, setCartItems(mockCartItems))).toEqual({
      cartItems: mockCartItems,
      isOpen: false,
    });
  });
  test("add new item to prefilled cart", () => {
    const newItem = { id: 3 };
    expect(
      reducer(
        { ...initialState, cartItems: mockCartItems },
        increaseCartQuantity(newItem)
      )
    ).toEqual({
      ...initialState,
      cartItems: [...mockCartItems, { ...newItem, quantity: 1 }],
    });
  });
  test("increase added item quantity", () => {
    expect(
      reducer(
        { ...initialState, cartItems: mockCartItems },
        increaseCartQuantity({ id: 2 })
      )
    ).toEqual({
      ...initialState,
      cartItems: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 3 },
      ],
    });
  });
  test("decrease item quantity to remove it from the cart", () => {
    expect(
      reducer(
        { ...initialState, cartItems: mockCartItems },
        decreaseCartQuantity({ id: 1 })
      )
    ).toEqual({
      ...initialState,
      cartItems: [{ id: 2, quantity: 2 }],
    });
  });
  test("decrease item quantity", () => {
    expect(
      reducer(
        { ...initialState, cartItems: mockCartItems },
        decreaseCartQuantity({ id: 2 })
      )
    ).toEqual({
      ...initialState,
      cartItems: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
      ],
    });
  });
  test("remove item from the cart", () => {
    expect(
      reducer(
        { ...initialState, cartItems: mockCartItems },
        removeFromCart({ id: 2 })
      )
    ).toEqual({
      ...initialState,
      cartItems: [{ id: 1, quantity: 1 }],
    });
  });
});
