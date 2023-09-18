import { createSlice } from "@reduxjs/toolkit";


const initialState = {loggedIn: false, id: '', accountId: ''}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logIn: (state, action) => {
        console.log("payload",action.payload)
        state.loggedIn = true;
        state.id = action.payload.id;
        state.accountId = action.payload.accountId;
        console.log("state id", state.id)
        console.log("state accoutnId", state.accountId)

      },
      logOut: (state, action) => {
        state.loggedIn = false
      }
    }
})

export default authSlice.reducer;