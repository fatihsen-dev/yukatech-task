import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import datas from "../dummydata/data.json";
import Login from "./Login";
import Main from "./Main";
import { login, logout } from "../store/auth";
import { useEffect } from "react";

export default function Home() {
   const { userStatus, userData } = useSelector((state) => state.authSlice);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!localStorage.getItem("user") && !userData) {
         dispatch(logout());
      }

      if (localStorage.getItem("user")) {
         const getLocal = JSON.parse(localStorage.getItem("user"));
         const filtered = datas.find((data) => data.username === getLocal.username);
         if (filtered) {
            if (filtered.password !== getLocal.password) {
               dispatch(logout());
            } else if (filtered.password === getLocal.password) {
               dispatch(login(filtered));
            }
         }
      }
   }, [userStatus]);

   if (userStatus === null) {
      return (
         <div className="h-full bg-dark">
            <Toaster position='top-left' reverseOrder={false} />
         </div>
      );
   }
   if (userStatus === false) {
      return (
         <>
            <Login />
            <Toaster position='top-left' reverseOrder={false} />
         </>
      );
   }
   return (
      <>
         <Main />
         <Toaster position='top-left' reverseOrder={false} />
      </>
   );
}
