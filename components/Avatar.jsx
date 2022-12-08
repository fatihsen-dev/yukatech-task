import BoringAvatar from "boring-avatars";
export default function Avatar({ size, name }) {
   return (
      <div className='rounded-full overflow-hidden'>
         <BoringAvatar size={size} name={name} variant='beam' />
      </div>
   );
}
