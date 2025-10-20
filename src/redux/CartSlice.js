import { createSlice } from "@reduxjs/toolkit";
import { db } from "../lib/init-firebase";
import { doc, updateDoc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const initialState = {
  cart: [],
  value: [],
  cartTotalAmount: 0,
};

const saveCartToFirestore = async (userId, cart) => {
  if (!userId) return;
  const userRef = doc(db, "Accounts", userId);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await setDoc(userRef, { cart: [] }, { merge: true });
  }
  await updateDoc(userRef, { cart });
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state, action) => {
      const { items = [], total = 0 } = action.payload || {};
      state.cart = items;
      state.value = items.map((i) => i.id);
      state.cartTotalAmount = total;
    },
    add: (state, action) => {
      const item = action.payload;
      if (!state.value.includes(item.id)) {
        state.cart.push(item);
        state.value.push(item.id);
      }
    },
    remove: (state, action) => {
      const id = action.payload.id;
      state.cart = state.cart.filter((item) => item.id !== id);
      state.value = state.value.filter((i) => i !== id);
    },
    Subtotal: (state) => {
      const total = state.cart.reduce(
        (sum, item) => sum + (item.data.Price || 0) * (item.data.quantity || 1),
        0
      );
      state.cartTotalAmount = Math.round(total);
    },
  },
});

export const { loadCart, add, remove, Subtotal } = cartSlice.actions;

// Firestore listeners & sync
export const listenToCart = (userId) => (dispatch) => {
  if (!userId) return;
  const userRef = doc(db, "Accounts", userId);

  onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const cart = data.cart || [];
      dispatch(loadCart({ items: cart }));
      dispatch(Subtotal());
    } else {
      dispatch(loadCart({ items: [] }));
    }
  });
};

export const syncCart = () => async (dispatch, getState) => {
  const state = getState();
  const userId = state.auth?.id;
  if (!userId) return;
  await saveCartToFirestore(userId, state.cart.cart);
};

export default cartSlice.reducer;
