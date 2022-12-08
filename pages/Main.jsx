import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import data from "../dummydata/data.json";
import Admin from "./Admin";
import Todo from "./Todo";
import { loadData } from "../store/datas";
import { useEffect } from "react";

export default function Main() {
   const { userData } = useSelector((state) => state.authSlice);
   const dispatch = useDispatch();

   useEffect(() => {
      if (userData.admin === true) {
         if (localStorage.getItem("datas")) {
            dispatch(loadData(JSON.parse(localStorage.getItem("datas"))));
         } else {
            dispatch(loadData(data));
            localStorage.setItem("datas", JSON.stringify(data));
         }
      } else {
         if (localStorage.getItem("datas")) {
            const getLocal = JSON.parse(localStorage.getItem("datas"));
            const filtered = getLocal.find((user) => user.id === userData.id);
            dispatch(loadData(filtered.todos));
         } else {
            dispatch(loadData(userData.todos));
            localStorage.setItem("datas", JSON.stringify(data));
         }
      }
   }, []);

   if (userData.admin === true) {
      return <Admin />;
   } else {
      return <Todo />;
   }
}
