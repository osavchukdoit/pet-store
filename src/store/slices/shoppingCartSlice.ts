import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  quantity: number;
};

const initialState = {
  cartItems: <CartItem[]>[],
  cartQuantity: 0,
  isOpen: false,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    increaseCartQuantity(state, action) {
      if (
        state.cartItems.find((item) => item.id === action.payload.id) == null
      ) {
        state.cartItems = [
          ...state.cartItems,
          { id: action.payload.id, quantity: 1 },
        ];
      } else {
        const result = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        state.cartItems = result;
      }
    },
    decreaseCartQuantity(state, action) {
      if (
        state.cartItems.find((item) => item.id === action.payload.id)
          ?.quantity === 1
      ) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        const result = state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        state.cartItems = result;
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const {
  setCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
  openCart,
  closeCart,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
