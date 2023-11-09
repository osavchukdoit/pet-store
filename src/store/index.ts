import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import operationsReducer from "./slices/operationsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { storeItemsApi } from "./storeItemsApi";
import { logger, notifier } from "./middleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: shoppingCartReducer,
    operations: operationsReducer,
    [storeItemsApi.reducerPath]: storeItemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeItemsApi.middleware, notifier, logger),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
