import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='h-full flex flex-col relative bg-yellow-400'>
      <header>
        <h1 className='text-6xl text-center py-20 font-jersey'>
          TYPING EXERCISE
        </h1>
      </header>
      <main className='px-32 font-orbit'>
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
