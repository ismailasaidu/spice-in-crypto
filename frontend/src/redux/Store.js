import { configureStore } from "@reduxjs/toolkit";
import CartSlice, { syncCartToFirestore } from "./CartSlice";
import AuthSlice from "./AuthSlice";

const autoSyncCart = (storeAPI) => (next) => async (action) => {
  const result = next(action);

  const state = storeAPI.getState();
  const userId = state.auth.id;

  const cartActions = [
    "cart/add",
    "cart/remove",
    "cart/increaseQuantity",
    "cart/decreaseQuantity",
  ];

  if (userId && cartActions.includes(action.type)) {
    await syncCartToFirestore(userId, state.cart);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    auth: AuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoSyncCart),
});

export default store;
