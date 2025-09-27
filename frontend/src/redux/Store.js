import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import AuthSlice from "./AuthSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    auth: AuthSlice,
  },
});
