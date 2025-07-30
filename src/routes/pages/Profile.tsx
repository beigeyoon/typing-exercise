import yooni from '@/assets/yooni.webp';

export default function Profile() {
  return (
    <div className='w-full border-2 p-14 text-xl flex gap-20 items-center justify-center'>
      <img src={yooni} className='w-48 opacity-50' />
      <ul>
        <li className='font-bold pb-3 text-2xl'>Yeokyung Yoon</li>
        <li>Frontend developer</li>
        <li>Amateur photographer</li>
        <li className='mb-2'>Seoul, Korea</li>
        <li className='text-[18px]'>✉️ beige.yoon@gmail.com</li>
        <li className='text-[18px]'>
          <a href="https://www.yooni.seoul.kr" target="_blank">
            🖥️ <span className='underline hover:text-gray-500'>https://yooni.seoul.kr</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
