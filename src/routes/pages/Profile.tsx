import yooni from '@/assets/yooni.webp';

export default function Profile() {
  return (
    <div className='w-full border-2 p-14 text-xl flex gap-20 items-center justify-center'>
      <img src={yooni} className='w-40 opacity-50' />
      <ul>
        <li className='font-bold pb-3 text-2xl'>Yeokyung Yoon</li>
        <li>Frontend developer</li>
        <li>Amateur photographer</li>
        <li>beige.yoon@gmail.com</li>
        <li>Seoul, Korea</li>
      </ul>
    </div>
  )
}
