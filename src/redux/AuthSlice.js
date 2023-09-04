import { createSlice } from "@reduxjs/toolkit";


const initialState = {loggedIn: false, id: ''}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logIn: (state, action) => {
        state.loggedIn = true;
        state.id = action.payload;
      },
      logOut: (state, action) => {
        state.loggedIn = false
      }
    }
})

export default authSlice.reducer;