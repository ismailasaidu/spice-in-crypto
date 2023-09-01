import { createSlice } from "@reduxjs/toolkit";


const initialState = {loggedIn: false}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logIn: (state, action) => {
        state.loggedIn = true
      },
      logOut: (state, action) => {
        state.loggedIn = false
      }
    }
})

export default authSlice.reducer;