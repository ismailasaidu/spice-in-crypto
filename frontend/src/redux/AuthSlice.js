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
      state.loggedIn = true;
      state.id = action.payload.id || "";
      state.accountId = action.payload.accountId || "";
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.id = "";
      state.accountId = "";
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
