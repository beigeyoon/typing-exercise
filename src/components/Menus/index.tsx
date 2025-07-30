import { Link } from "react-router-dom";

export default function () {
  return (
    <div className='flex flex-col text-xl mx-auto border-2 leading-none text-center w-full'>
      <Link to="/korean" className='p-3 border-b-2 hover:bg-stone-400/20'>문장 연습</Link>
      <Link to="/english" className='p-3 border-b-2 hover:bg-stone-400/20'>영문 연습</Link>
      <Link to="/profile" className='p-3 hover:bg-stone-400/20'>만든 사람</Link>
    </div>
  );
}
