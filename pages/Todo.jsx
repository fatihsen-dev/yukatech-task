import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import { IoIosLogOut, IoMdCheckmark, IoMdTrash } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { logout } from "../store/auth";
import { useRef, useState } from "react";
import { updateTodoStatus, addTodo } from "../store/datas";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Todo() {
   const { userData } = useSelector((state) => state.authSlice);
   const { datas } = useSelector((state) => state.dataSlice);
   const [tab, setTab] = useState("active");
   const textInput = useRef();
   const dispatch = useDispatch();

   const addTodoHandle = (e) => {
      e.preventDefault();
      if (textInput.current.value.length === 0) {
         toast.error("Lütfen ilgili alanları doldurun.");
      }
      dispatch(addTodo({ value: textInput.current.value, user: userData }));
      textInput.current.value = "";
   };

   const deleteTodoHandle = (index, data) => {
      dispatch(updateTodoStatus({ userid: data.id, status: "deleted", postid: index }));
   };
   const complateTodoHandle = (index, data) => {
      dispatch(updateTodoStatus({ userid: data.id, status: "complated", postid: index }));
   };

   const updateTodoHandle = (data) => {
      console.log(data);
   };

   return (
      <div className='bg-dark h-full'>
         <Head>
            <title>Todo</title>
            <meta name='description' content='Development by Fatih Şen' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <div className='container h-full m-auto flex'>
            <div className='w-7/12 h-4/6 max-h-[1000px] gap-6 rounded m-auto p-6 bg-gray border border-gray2 flex flex-col'>
               <div className='flex text-light gap-2.5 items-center'>
                  <Avatar className='' size={34} name={userData.username} />
                  <span className='text-lg'>{userData.username}</span>
                  <button onClick={() => dispatch(logout())} className='ml-auto text-2xl'>
                     <IoIosLogOut />
                  </button>
               </div>
               <div className='flex-1 flex flex-col'>
                  <div className='flex items-center justify-between'>
                     <button
                        onClick={() => setTab("active")}
                        style={
                           tab == "active"
                              ? { backgroundColor: "#222831", borderColor: "#454C56" }
                              : null
                        }
                        className='transition-colors text-xl px-8 border-x border-t border-transparent bg-transparent rounded-t py-1.5 text-white'>
                        Todo
                     </button>
                     <button
                        onClick={() => setTab("complated")}
                        style={
                           tab == "complated"
                              ? { backgroundColor: "#222831", borderColor: "#454C56" }
                              : null
                        }
                        className='transition-colors text-xl px-8 border-x border-t bg-transparent border-transparent rounded-t py-1.5 text-white'>
                        Completed
                     </button>
                     <form
                        className='flex ml-auto items-center h-full flex-1 pb-1 gap-1.5'
                        onSubmit={addTodoHandle}>
                        <input
                           ref={textInput}
                           className='w-7/12 ml-auto text-lg rounded px-1.5 h-full'
                           type='text'
                           placeholder='Add Todo...'
                        />
                        <button className='bg-green hover:bg-green/90 transition-colors text-light rounded px-4 font-medium h-full'>
                           Add Todo
                        </button>
                     </form>
                  </div>
                  {datas && (
                     <ul
                        style={tab == false ? { borderRadius: "0 4px 4px 4px" } : null}
                        className='flex-1 bg-dark flex flex-col gap-1.5 rounded p-3 border border-gray2'>
                        {datas.map((data, index) => {
                           if (data.status == tab) {
                              return (
                                 <li
                                    key={index}
                                    className='flex bg-light p-1 rounded items-center justify-between'>
                                    <span className='text-lg font-medium text-darkText'>
                                       {data.text}
                                    </span>
                                    {data.status == "active" && (
                                       <div className='flex items-center gap-2'>
                                          <button
                                             onClick={() =>
                                                complateTodoHandle(data.id, userData)
                                             }
                                             className='bg-green hover:bg-green/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                             <IoMdCheckmark />
                                          </button>
                                          <Link
                                             href={`/edit/${data.id}`}
                                             className='bg-blue hover:bg-blue/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                             <RiPencilFill />
                                          </Link>
                                          <button
                                             onClick={() =>
                                                deleteTodoHandle(data.id, userData)
                                             }
                                             className='bg-red hover:bg-red/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                             <IoMdTrash />
                                          </button>
                                       </div>
                                    )}
                                    {data.status == "complated" && (
                                       <span className='text-green pr-2'>Complated</span>
                                    )}
                                 </li>
                              );
                           }
                        })}
                     </ul>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
