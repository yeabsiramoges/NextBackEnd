import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default async function Home() {
  return (
    <div
      className="
        flex
        min-h-full
        flex-col
        justify-center
        py-12
        sm:px-6
        lm:px-8
        h-screen 
        place-items-center
        bg-slate-100
      ">

      {/* TODO: Make Logo + Signin Text Inline */}
      
      {/* Video Logo Div */}
      <div className="sm:mx-auto sm:w-auto sm:max-w-md">
        <Image 
          alt='Logo'
          height="48"
          width="48"
          className='mx-auto w-12'
          src='/images/logo.png'
        />
      </div>

      {/* Sign In Text Display*/}
      <h2
        className='
          mt-4
          text-center
          text-2xl
          font-bold
          tracking-tight
          text-gray-900
        '>
          Account Login
      </h2>

      {/* Sign In Text Display*/}
      <AuthForm />

    </div>
  )
}
