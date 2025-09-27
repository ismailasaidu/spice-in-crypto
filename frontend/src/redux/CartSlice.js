// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "../lib/init-firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

/*
  Keeps your original localStorage behavior but:
   - adds fetchCart(userId) to load from Firestore
   - adds saveCartToFirestore(userId, state) helper
   - exports handy thunks addAndSync/removeAndSync/etc. so components don't have to call save manually
*/

const initialState = {
  value: localStorage.getItem("CartValue")
    ? JSON.parse(localStorage.getItem("CartValue"))
    : [],
  cart: localStorage.getItem("CartItems")
    ? JSON.parse(localStorage.getItem("CartItems"))
    : [],
  cartTotalQuantity: [],
  cartTotalAmount: localStorage.getItem("Carttotal")
    ? JSON.parse(localStorage.getItem("Carttotal"))
    : 0,
  loading: false,
};

const saveLocal = (state) => {
  try {
    localStorage.setItem("CartItems", JSON.stringify(state.cart));
    localStorage.setItem("CartValue", JSON.stringify(state.value));
    localStorage.setItem("Carttotal", JSON.stringify(state.cartTotalAmount));
  } catch (e) {
    console.error("localStorage save failed", e);
  }
};

const saveCartToFirestore = async (userId, state) => {
  if (!userId) return;
  try {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, {
      items: state.cart,
      value: state.value,
      total: state.cartTotalAmount,
    });
  } catch (err) {
    console.error("Failed to save cart to Firestore:", err);
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // used when loading from Firestore
    loadCart: (state, action) => {
      const payload = action.payload || {};
      state.cart = payload.items || [];
      state.value = payload.value || state.cart.map((i) => i.id);
      state.cartTotalAmount = payload.total || 0;
      saveLocal(state);
    },

    clearCart: (state) => {
      state.cart = [];
      state.value = [];
      state.cartTotalAmount = 0;
      saveLocal(state);
    },

    add: (state, action) => {
      if (state.value.includes(action.payload.id)) {
        toast.warning(`${action.payload.data.Description} already in the cart`);
      } else {
        state.value.push(action.payload.id);
        state.cart.push(action.payload);
        toast.success(`${action.payload.data.Description} added to cart`);
      }
      saveLocal(state);
    },

    remove: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.value = state.value.filter((id) => id !== action.payload.id);
      saveLocal(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find((a) => a.id === action.payload);
      if (item) {
        item.data.quantity = (item.data.quantity || 0) + 1;
      }
      saveLocal(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find((a) => a.id === action.payload);
      if (item && item.data.quantity > 1) {
        item.data.quantity -= 1;
      }
      saveLocal(state);
    },

    Subtotal: (state) => {
      const values = state.cart.map(
        (item) => item.data.quantity * item.data.Price
      );
      const newValue = values.reduce((a, b) => a + b, 0);
      state.cartTotalAmount = Math.round(newValue || 0);
      saveLocal(state);
    },
  },
});

export const {
  loadCart,
  clearCart,
  add,
  remove,
  increaseQuantity,
  decreaseQuantity,
  Subtotal,
} = cartSlice.actions;

export default cartSlice.reducer;

/* ---------------------------
   Thunks (easy to use)
   - fetchCart(userId): loads Firestore cart into redux
   - saveCart(userId): saves current redux cart to Firestore
   - addAndSync / removeAndSync / ... : convenience thunks that update state then sync
   --------------------------- */

export const fetchCart = (userId) => async (dispatch) => {
  if (!userId) return;
  try {
    const cartRef = doc(db, "carts", userId);
    const snap = await getDoc(cartRef);
    if (snap.exists()) {
      const data = snap.data();
      // support both shapes (data.items or data.cart)
      const items = data.items || data.cart || [];
      const value = data.value || items.map((i) => i.id) || [];
      const total = data.total || data.cartTotalAmount || 0;
      dispatch(loadCart({ items, value, total }));
    } else {
      // no cart in DB: keep local or empty
      // optional: clearCart or leave existing local cart
    }
  } catch (err) {
    console.error("fetchCart error:", err);
  }
};

export const saveCart = () => async (dispatch, getState) => {
  const state = getState();
  const userId = state.auth?.id; // check your auth slice uses id
  try {
    await saveCartToFirestore(userId, state.cart);
  } catch (err) {
    console.error("saveCart thunk error:", err);
  }
};

// convenience thunks that update + sync
export const addAndSync = (item) => async (dispatch) => {
  dispatch(add(item));
  dispatch(Subtotal());
  // attempt remote save (fire-and-forget)
  dispatch(saveCart());
};

export const removeAndSync = (payload) => async (dispatch) => {
  dispatch(remove(payload));
  dispatch(Subtotal());
  dispatch(saveCart());
};

export const increaseAndSync = (id) => async (dispatch) => {
  dispatch(increaseQuantity(id));
  dispatch(Subtotal());
  dispatch(saveCart());
};

export const decreaseAndSync = (id) => async (dispatch) => {
  dispatch(decreaseQuantity(id));
  dispatch(Subtotal());
  dispatch(saveCart());
};
