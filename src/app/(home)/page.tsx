import Image from 'next/image';
import Link from 'next/link';
import RoutineList from './components/RoutineList';
import PlusRoutineBtn from '@/components/common/PlusRoutineBtn';
import { url } from 'inspector';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default function Home() {
  const session = auth();
  if (!session) {
    redirect('/sign');
  }
  return (
    <div className="flex flex-col h-screen bg-[#212227]">
      <div className="w-full h-[64px] bg-[#292C33] flex items-center mb-2 px-5">
        <Link
          href="/exercise-list/search"
          className="flex items-center w-full h-10  text-sm leading-5 py-2.5 rounded-6 bg-backgrounds-light"
        >
          <Image className="m-2" src={'/assets/search.svg'} width={24} height={24} alt="돋보기" />
          <span className="text-[#999999]">궁금한 운동이 있으신가요?</span>
        </Link>
      </div>
      <h4 className="text-[18px] font-semibold leading-[26px] py-2 pl-5 text-[#EDEDED]">내 루틴</h4>
      <RoutineList />
      <PlusRoutineBtn href="/routine/new" />
    </div>
  );
}
url;
