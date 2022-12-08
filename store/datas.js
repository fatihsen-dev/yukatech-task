import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   datas: false,
};

export const dataSlice = createSlice({
   name: "dataSlice",
   initialState,
   reducers: {
      loadData: (state, actions) => {
         state.datas = actions.payload;
      },
   },
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;
