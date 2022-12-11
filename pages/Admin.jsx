import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import { IoMdCheckmark, IoMdTrash } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { logout } from "../store/auth";
import { useEffect, useRef, useState } from "react";
import { addNewTodo, todoTransfer, updateTodo } from "../store/datas";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Admin() {
   const { datas } = useSelector((state) => state.dataSlice);
   const [data, setData] = useState(false);
   const [sidebar, setSidebar] = useState(false);
   const [tab, setTab] = useState("active");
   const [getData, setGetData] = useState(true);
   const textInput = useRef();
   const dispatch = useDispatch();

   useEffect(() => {
      if (datas && getData) {
         setData([...datas.filter((data) => data.admin !== true)][0]);
         setGetData(false);
      }
   }, [datas]);

   const reloadData = (userid) => {
      setData({
         ...JSON.parse(localStorage.getItem("datas")).find((data) => data.id === userid),
      });
   };

   const activeData = (userid) => {
      reloadData(userid);
   };

   const addTodoHandle = (e) => {
      e.preventDefault();
      if (textInput.current.value.length === 0) {
         return toast.error("Lütfen ilgili alanları doldurun.");
      }
      dispatch(addNewTodo({ text: textInput.current.value, userid: data.id }));
      textInput.current.value = "";
      reloadData(data.id);
   };

   const complateTodoHandle = (todoid, userid) => {
      dispatch(updateTodo({ todoid, userid, status: "complated" }));
      reloadData(userid);
      toast.success("Görev tamamlandı");
   };
   const deleteTodoHandle = (todoid, userid) => {
      dispatch(updateTodo({ todoid, userid, status: "deleted" }));
      reloadData(userid);
      toast.success("Görev silindi");
   };
   const restoreTodoHandle = (todoid, userid) => {
      dispatch(updateTodo({ todoid, userid, status: "active" }));
      reloadData(userid);
      toast.success("Görev geri alındı");
   };

   return (
      <>
         {data && (
            <div className='bg-dark h-full'>
               <Head>
                  <title>Todo</title>
                  <meta name='description' content='Development by Fatih Şen' />
                  <link rel='icon' href='/favicon.ico' />
               </Head>
               <div className='2xl:container lg:container h-full m-auto flex'>
                  <div className='2xl:w-3/4 xl:w-5/6 lg:w-full 2xl:h-4/6 lg:h-4/6 w-full h-full min-h-[400px] max-h-[1000px] rounded m-auto bg-gray border border-gray2 flex'>
                     <div
                        style={sidebar ? { left: 0 } : {}}
                        className='z-10 2xl:relative transition-all md:relative absolute flex 2xl:left-0 md:left-0 -left-full top-0 flex-col p-6 border-r border-gray2 h-full 2xl:bg-gray md:bg-gray bg-dark justify-between'>
                        <ul className='flex flex-col gap-2'>
                           <button
                              onClick={() => setSidebar(!sidebar)}
                              className='ml-auto text-2xl text-light 2xl:hidden md:hidden inline-block'>
                              <IoMdClose />
                           </button>
                           {datas &&
                              datas.map(
                                 (data, index) =>
                                    data.admin !== true && (
                                       <button
                                          onClick={() => {
                                             activeData(data.id);
                                             setSidebar(!sidebar);
                                          }}
                                          className='flex p-2 py-1.5 rounded-sm bg-dark items-center gap-2'
                                          key={index}>
                                          <Avatar name={data.username} size={28} />
                                          <span className='text-light text-lg pr-10'>
                                             {data.username}
                                          </span>
                                       </button>
                                    )
                              )}
                        </ul>
                        <button
                           onClick={() => dispatch(logout())}
                           className='bg-red w-full text-light rounded-sm py-1 hover:bg-red/90 transition-colors'>
                           Exit
                        </button>
                     </div>
                     <div className='flex-1 flex flex-col p-6'>
                        <div className='flex items-center gap-2 justify-between 2xl:flex-row lg:flex-row flex-col-reverse'>
                           <div className='flex mr-auto 2xl:w-auto lg:w-auto w-full'>
                              <button
                                 onClick={() => setTab("active")}
                                 style={
                                    tab == "active"
                                       ? {
                                            backgroundColor: "#222831",
                                            borderColor: "#454C56",
                                         }
                                       : null
                                 }
                                 className='transition-colors text-xl border-x border-t border-transparent bg-transparent rounded-t py-1.5 text-white 2xl:px-8 lg:px-8 px-3 2xl:flex-auto lg:flex-auto flex-1'>
                                 Todo
                              </button>
                              <button
                                 onClick={() => setTab("complated")}
                                 style={
                                    tab == "complated"
                                       ? {
                                            backgroundColor: "#222831",
                                            borderColor: "#454C56",
                                         }
                                       : null
                                 }
                                 className='transition-colors text-xl border-x border-t bg-transparent border-transparent rounded-t py-1.5 text-white 2xl:px-8 lg:px-8 px-3 2xl:flex-auto lg:flex-auto flex-1'>
                                 Completed
                              </button>
                              <button
                                 onClick={() => setTab("deleted")}
                                 style={
                                    tab == "deleted"
                                       ? {
                                            backgroundColor: "#222831",
                                            borderColor: "#454C56",
                                         }
                                       : null
                                 }
                                 className='transition-colors text-xl border-x border-t bg-transparent border-transparent rounded-t py-1.5 text-white 2xl:px-8 lg:px-8 px-3 2xl:flex-auto lg:flex-auto flex-1'>
                                 Deleted
                              </button>
                           </div>
                           <div className='flex w-full flex-col ml-auto items-center h-full flex-1 pb-1 gap-3'>
                              <button
                                 onClick={(e) => {
                                    setSidebar(!sidebar);
                                 }}
                                 className='h-10 mr-auto w-10 2xl:hidden md:hidden bg-blue rounded text-xl text-light flex justify-center items-center'>
                                 <FaUsers />
                              </button>
                              <form
                                 onSubmit={addTodoHandle}
                                 className='w-full flex gap-2 flex-1'>
                                 <input
                                    ref={textInput}
                                    className='w-7/12 ml-auto 2xl:h-auto lg:h-auto h-10 text-lg rounded px-1.5 flex-1'
                                    type='text'
                                    placeholder='Add Todo...'
                                 />
                                 <button className='bg-green 2xl:h-auto lg:h-auto h-10 hover:bg-green/90 transition-colors text-light rounded px-4 font-medium'>
                                    Add Todo
                                 </button>
                              </form>
                           </div>
                        </div>
                        <ul
                           style={tab == false ? { borderRadius: "0 4px 4px 4px" } : null}
                           className='flex-1 bg-dark flex flex-col gap-1.5 rounded p-3 border border-gray2'>
                           {data.todos &&
                              data.todos.map((todo, index) => {
                                 if (todo.status == tab) {
                                    return (
                                       <li
                                          key={index}
                                          className='flex bg-light p-1 rounded 2xl:flex-row md:flex-row flex-col items-center justify-between gap-3'>
                                          <span className='text-lg font-medium text-darkText mr-auto'>
                                             {todo.text}
                                          </span>
                                          {todo.status == "active" && (
                                             <div className='flex ml-auto items-center gap-2'>
                                                <button
                                                   onClick={() =>
                                                      complateTodoHandle(todo.id, data.id)
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
                                                            userid: data.id,
                                                         })
                                                      )
                                                   }
                                                   className='bg-blue hover:bg-blue/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                                   <RiPencilFill />
                                                </Link>
                                                <button
                                                   onClick={() =>
                                                      deleteTodoHandle(todo.id, data.id)
                                                   }
                                                   className='bg-red hover:bg-red/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                                   <IoMdTrash />
                                                </button>
                                             </div>
                                          )}
                                          {todo.status == "deleted" && (
                                             <div className='flex items-center gap-2 ml-auto'>
                                                <button
                                                   onClick={() =>
                                                      restoreTodoHandle(todo.id, data.id)
                                                   }
                                                   className='bg-green hover:bg-green/80 transition-colors w-7 text-light rounded-sm h-7 grid place-items-center'>
                                                   <MdRestore />
                                                </button>
                                             </div>
                                          )}
                                          {todo.status == "complated" && (
                                             <span className='text-green pr-2 ml-auto'>
                                                Complated
                                             </span>
                                          )}
                                       </li>
                                    );
                                 }
                              })}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}
