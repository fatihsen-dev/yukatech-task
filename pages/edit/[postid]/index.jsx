import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../../../store/datas";

export default function Edit({ params }) {
   const router = useRouter();
   const { todo } = useSelector((state) => state.dataSlice);
   const dispatch = useDispatch();
   const textInput = useRef();

   const updateTodoHandle = (e) => {
      e.preventDefault();
      if (textInput.current.value.length === 0) {
         return toast.error("Lütfen ilgili alanları doldurun.");
      }
      dispatch(
         updateTodo({
            todoid: todo.todo.id,
            userid: todo.userid,
            text: textInput.current.value,
         })
      );

      textInput.current.value = "";
      router.push("/");
   };
   return (
      <div className='h-full'>
         <Head>
            <title>Todo Update</title>
            <meta name='description' content='Development by Fatih Şen' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
         <div className='container h-full m-auto flex justify-center items-center'>
            <div className='p-5 bg-gray border border-gray2 flex flex-col gap-3 rounded-sm'>
               <span className='text-2xl mb-2 text-light font-medium'>Todo Update</span>
               <input
                  placeholder='Todo text...'
                  className='rounded-sm w-96 p-1.5 text-lg'
                  type='text'
                  ref={textInput}
                  defaultValue={todo.todo.text}
               />
               <button
                  onClick={updateTodoHandle}
                  className='w-full py-1.5 font-medium text-light bg-green px-7 rounded-sm'>
                  Update
               </button>
            </div>
         </div>
      </div>
   );
}
