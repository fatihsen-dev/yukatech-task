import { useRouter } from "next/router";

export default function Edit({ params }) {
   const router = useRouter();
   const { postid } = router.query;

   return (
      <div className='h-full'>
         <div className='container h-full m-auto flex justify-center items-center'>
            <div className='p-5 bg-gray border border-gray2 flex flex-col gap-3 rounded-sm'>
               <span className='text-2xl mb-2 text-light font-medium'>Todo Update</span>
               <input
                  placeholder='Todo text...'
                  className='rounded-sm w-96 p-1.5 text-lg'
                  type='text'
                  defaultValue={postid}
               />
               <button
                  onClick={() => router.push("/")}
                  className='w-full py-1.5 font-medium text-light bg-green px-7 rounded-sm'>
                  Update
               </button>
            </div>
         </div>
      </div>
   );
}
