import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  id: "",
  accountId: "",
};

// Load login state from localStorage if exists
const savedAccount = JSON.parse(localStorage.getItem("Account"));

if (savedAccount && savedAccount.accountId) {
  initialState.loggedIn = true;
  initialState.id = savedAccount.id || "";
  initialState.accountId = savedAccount.accountId || "";
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      const payload = action.payload || {};
      state.loggedIn = true;
      state.id = payload.id || "";
      state.accountId = payload.accountId || "";
      localStorage.setItem("Account", JSON.stringify(payload));
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.id = "";
      state.accountId = "";
      localStorage.removeItem("Account");
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
