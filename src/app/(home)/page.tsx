import Image from 'next/image';
import Link from 'next/link';
import RoutineList from './components/RoutineList';
import PlusRoutineBtn from './components/PlusRoutineBtn';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#212227]">
      <div className="w-full h-[64px] bg-[#292C33] flex items-center mb-2 px-5">
        <Link
          href="#"
          className="flex items-center w-full h-[40px]  text-[14px] leading-[20px] py-[10px] rounded-[6px] bg-[#3A3E47]"
        >
          <Image className="m-2" src={'/assets/search.svg'} width={24} height={24} alt="돋보기" />
          <span className="text-[#999999]">궁금한 운동이 있으신가요?</span>
        </Link>
      </div>
      <h4 className="text-[18px] font-semibold leading-[26px] py-2 pl-5 text-[#EDEDED]">내 루틴</h4>
      <RoutineList />
      <PlusRoutineBtn />
    </div>
  );
}
