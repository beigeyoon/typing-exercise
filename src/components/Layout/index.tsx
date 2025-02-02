import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='h-full flex flex-col relative bg-amber-200'>
      <header>
        <h1 className='text-5xl text-center py-24 font-russo-one'>
          TYPING EXERCISE
        </h1>
      </header>
      <main className='mx-auto w-[680px]'>
        <Outlet />
      </main>
      <footer className='absolute bottom-0 w-full text-lg text-center py-8 font-jersey'>
        <p>
          © 2025 Typing Exercise by yooni
        </p>
      </footer>
    </div>
  );
}
