import { createSlice } from "@reduxjs/toolkit";

let initialState = {
   datas: false,
   todo: false,
};

export const dataSlice = createSlice({
   name: "dataSlice",
   initialState,
   reducers: {
      loadData: (state, action) => {
         state.datas = action.payload;
      },
      todoTransfer: (state, action) => {
         state.todo = action.payload;
      },
      addNewTodo: (state, action) => {
         const { text, userid } = action.payload;
         const localData = JSON.parse(localStorage.getItem("datas"));
         const leftData = localData.filter((dt) => dt.id !== userid);
         const user = localData.find((user) => user.id === userid);
         state.datas = [
            ...leftData,
            {
               ...user,
               todos: [
                  ...user.todos,
                  { id: user.todos.length + 1, text, status: "active" },
               ],
            },
         ];
         localStorage.setItem("datas", JSON.stringify(state.datas));
      },
      updateTodo: (state, action) => {
         let { todoid, userid, status, text } = action.payload;
         const localData = [...JSON.parse(localStorage.getItem("datas"))];
         let leftData = [...localData.filter((dt) => dt.id !== userid)];
         let user = { ...localData.find((user) => user.id === userid) };
         let leftTodos = [...user.todos.filter((td) => td.id !== todoid)];
         let todo = { ...user.todos.find((td) => td.id === todoid) };
         if (status) {
            todo.status = status;
         }
         if (text) {
            todo.text = text;
         }
         state.datas = [
            ...leftData,
            {
               ...user,
               todos: [...leftTodos, todo],
            },
         ];
         state.datas.sort(function (a, b) {
            return a.id - b.id || a.username.localeCompare(b.username);
         });
         localStorage.setItem("datas", JSON.stringify(state.datas));
      },
   },
});

export const { loadData, todoTransfer, addNewTodo, updateTodo } = dataSlice.actions;
export default dataSlice.reducer;
