import { Link } from "react-router-dom";

export default function () {
  return (
    <div className='flex flex-col text-xl gap-2'>
      <Link to="/short">짧은 글 연습</Link>
      <Link to="/long">긴 글 연습</Link>
      <Link to="/">만든 사람</Link>
    </div>
  );
}
