import Head from "next/head";

export default function Main() {
   return (
      <div className='bg-dark h-full'>
         <Head>
            <title>Home</title>
            <meta name='description' content='Development by Fatih Şen' />
            <link rel='icon' href='/favicon.ico' />
         </Head>
      </div>
   );
}
