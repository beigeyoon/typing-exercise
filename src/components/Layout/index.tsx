import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='h-full flex flex-col relative bg-amber-200'>
      <header>
        <h1 className='text-5xl text-center py-24 font-russo-one'>
          Endless Short Typing
        </h1>
      </header>
      <main className='px-32'>
        <Outlet />
      </main>
      <footer className='absolute bottom-0 w-full text-lg text-center py-8 font-jersey'>
        <p>
          © 2025 Endless Short Typing by yooni
        </p>
      </footer>
    </div>
  );
}
