import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  id: null,
  accountId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Log the user in
    login: (state, action) => {
      state.loggedIn = true;
      state.id = action.payload.id;
      state.accountId = action.payload.accountId;
    },
    // Log the user out
    logout: (state) => {
      state.loggedIn = false;
      state.id = null;
      state.accountId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
