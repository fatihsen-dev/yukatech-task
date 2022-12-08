const { configureStore } = require("@reduxjs/toolkit");
import authSlice from "./auth";
import dataSlice from "./datas";

export const store = configureStore({
   reducer: {
      authSlice,
      dataSlice,
   },
});
