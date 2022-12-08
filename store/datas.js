import { createSlice } from "@reduxjs/toolkit";

let initialState = {
   datas: false,
};

export const dataSlice = createSlice({
   name: "dataSlice",
   initialState,
   reducers: {
      loadData: (state, action) => {
         state.datas = action.payload;
      },
      updateTodoStatus: (state, action) => {
         let leftUsers = JSON.parse(localStorage.getItem("datas")).filter(
            (db) => db.id !== action.payload.userid
         );
         let user = JSON.parse(localStorage.getItem("datas")).find(
            (db) => db.id === action.payload.userid
         );
         let todo = { ...user.todos.find((td) => td.id === action.payload.postid) };
         todo.status = action.payload.status;
         let leftTodos = user.todos.filter((td) => td.id !== action.payload.postid);

         console.log(leftUsers);
         localStorage.setItem(
            "datas",
            JSON.stringify([...leftUsers, { ...user, todos: [...leftTodos, todo] }])
         );
         state.datas = JSON.parse(localStorage.getItem("datas")).find(
            (db) => db.id === action.payload.userid
         ).todos;
      },

      addTodo: (state, action) => {
         state.datas = [
            ...state.datas,
            {
               text: action.payload.value,
               id: state.datas.length + 1,
               status: "active",
            },
         ];

         let localData = [
            ...JSON.parse(localStorage.getItem("datas")).filter(
               (dt) => dt.id !== action.payload.user.id
            ),
         ];
         localStorage.setItem(
            "datas",
            JSON.stringify([
               ...localData,
               {
                  ...action.payload.user,
                  todos: [...state.datas],
               },
            ])
         );
      },
   },
});

export const { loadData, updateTodoStatus, addTodo } = dataSlice.actions;
export default dataSlice.reducer;
