export default function Login() {
   return (
      <div className='h-full grid place-items-center'>
         <form
            className='flex flex-col gap-2 px-20 py-16 justify-center items-center bg-gray border border-gray2 rounded'
            onSubmit={loginHandle}>
            <h2 className='text-white text-4xl font-medium mb-4'>Welcome back</h2>
            <div className='flex flex-col mb-1.5'>
               <span className='text-sm text-light'>User Name</span>
               <input
                  className='rounded-[5px] focus:border-green text-lg px-2 py-1.5 loginUserName w-80 border border-gray3'
                  placeholder='USERNAME'
                  type='text'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className='flex flex-col'>
               <span className='text-sm text-light'>Password</span>
               <input
                  className='rounded-[5px] focus:border-green text-lg px-2 py-1.5 loginPassword w-80 border border-gray3'
                  placeholder='*********'
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className='mr-auto mb-4 cursor-pointer text-light select-none relative flex items-center'>
               <input
                  className='hidden peer'
                  name='remember'
                  type='checkbox'
                  id='remember'
               />
               <span className='w-[18px] h-[18px] absolute bg-light rounded-sm peer-checked:bg-green transition-all grid place-items-center'>
                  <IoMdCheckmark />
               </span>
               <label className='ml-6 cursor-pointer' htmlFor='remember'>
                  Remember
               </label>
            </div>
            <button
               disabled={!username || !password}
               className='rounded-[5px] disabled:opacity-70 bg-green hover:bg-green/90 transition-colors w-full text-lg font-medium p-2 text-light'>
               Sign in
            </button>
         </form>
      </div>
   );
}
