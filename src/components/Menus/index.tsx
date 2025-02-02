import { Link } from "react-router-dom";

export default function () {
  return (
    <div className='flex flex-col text-xl mx-auto border-2 leading-none text-center w-50'>
      <Link to="/short" className='p-2 border-b-2 hover:bg-stone-400/50'>짧은 글 연습</Link>
      <Link to="/profile" className='p-2 hover:bg-stone-400/50'>만든 사람</Link>
    </div>
  );
}
