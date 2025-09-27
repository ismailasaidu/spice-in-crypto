import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  id: "",
  accountId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      const payload = action.payload || {};
      state.loggedIn = true;
      state.id = payload.id || "";
      state.accountId = payload.accountId || "";
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.id = "";
      state.accountId = "";
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice;
