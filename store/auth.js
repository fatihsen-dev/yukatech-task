import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userStatus: null,
   userData: false,
};

export const authSlice = createSlice({
   name: "authSlice",
   initialState,
   reducers: {
      login: (state, action) => {
         state.userData = action.payload;
         state.userStatus = true;
      },
      logout: (state) => {
         state.userStatus = false;
         state.userData = false;
         localStorage.removeItem("user");
      },
   },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
