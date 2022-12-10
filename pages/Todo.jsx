import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import { IoIosLogOut, IoMdCheckmark, IoMdTrash } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { logout } from "../store/auth";
import { useEffect, useRef, useState } from "react";
import { addNewTodo, todoTransfer, updateTodo } from "../store/datas";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Todo() {
   const { userData } = useSelector((state) => state.authSlice);
   const { datas } = useSelector((state) => state.dataSlice);
   const [todos, setTodos] = useState(false);
   const [tab, setTab] = useState("active");
   const textInput = useRef();
   const dispatch = useDispatch();

   useEffect(() => {
      if (datas) {
         setTodos(datas.find((dt) => dt.id === userData.id).todos);
      }
   }, [datas]);

   const addTodoHandle = (e) => {
      e.preventDefault();
      if (textInput.current.value.length === 0) {
         return toast.error("Lütfen ilgili alanları doldurun.");
      }
      dispatch(addNewTodo({ text: textInput.current.value, userid: userData.id }));
      textInput.current.value = "";
   };

   const complateTodoHandle = (todoid, userid) => {
      dispatch(updateTodo({ todoid, userid, status: "complated" }));
   };
   const deleteTodoHandle = (todoid, userid) => {
      dispatch(updateTodo({ todoid, userid, status: "deleted" }));
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
                  {todos && (
                     <ul
                        style={tab == false ? { borderRadius: "0 4px 4px 4px" } : null}
                        className='flex-1 bg-dark flex flex-col gap-1.5 rounded p-3 border border-gray2'>
                        {todos.map((todo, index) => {
                           if (todo.status == tab) {
                              return (
                                 <li
                                    key={index}
                                    className='flex bg-light p-1 rounded items-center justify-between'>
                                    <span className='text-lg font-medium text-darkText'>
                                       {todo.text}
                                    </span>
                                    {todo.status == "active" && (
                                       <div className='flex items-center gap-2'>
                                          <button
                                             onClick={() =>
                                                complateTodoHandle(todo.id, userData.id)
                                             }
                                             className='bg-green hover:bg-green/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                             <IoMdCheckmark />
                                          </button>
                                          <Link
                                             href={`/edit/${todo.id}`}
                                             onClick={() =>
                                                dispatch(
                                                   todoTransfer({
                                                      todo: todo,
                                                      userid: userData.id,
                                                   })
                                                )
                                             }
                                             className='bg-blue hover:bg-blue/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                             <RiPencilFill />
                                          </Link>
                                          <button
                                             onClick={() =>
                                                deleteTodoHandle(todo.id, userData.id)
                                             }
                                             className='bg-red hover:bg-red/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                             <IoMdTrash />
                                          </button>
                                       </div>
                                    )}
                                    {todo.status == "complated" && (
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
