import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const initialState = {
  value: [],
  cart: [],
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromRemote: (state, action) => {
      state.cart = action.payload.cart || [];
      state.value = action.payload.value || [];
      state.cartTotalAmount = action.payload.cartTotalAmount || 0;
    },
    add: (state, action) => {
      if (state.value.includes(action.payload.id)) {
        toast.warning(`${action.payload.data.Description} already in the cart`);
      } else {
        state.cart.push(action.payload);
        state.value.push(action.payload.id);
        toast.success(`${action.payload.data.Description} added to cart`);
      }
    },
    remove: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.value = state.value.filter((id) => id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item) item.data.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      if (item && item.data.quantity > 1) item.data.quantity -= 1;
    },
    calculateSubtotal: (state) => {
      const total = state.cart.reduce(
        (sum, item) => sum + item.data.Price * item.data.quantity,
        0
      );
      state.cartTotalAmount = Math.round(total);
    },
  },
});

// Firestore helpers
export const fetchCartFromFirestore = async (userId) => {
  const docRef = doc(db, "Carts", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  return { cart: [], value: [], cartTotalAmount: 0 };
};

export const syncCartToFirestore = async (userId, cartState) => {
  await setDoc(doc(db, "Carts", userId), cartState);
};

export const {
  add,
  remove,
  increaseQuantity,
  decreaseQuantity,
  calculateSubtotal,
  setCartFromRemote,
} = cartSlice.actions;

export default cartSlice.reducer;
