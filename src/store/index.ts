import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import storeItemsReducer from "./slices/storeItemsSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import operationsReducer from "./slices/operationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    storeItems: storeItemsReducer,
    shoppingCart: shoppingCartReducer,
    operations: operationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
