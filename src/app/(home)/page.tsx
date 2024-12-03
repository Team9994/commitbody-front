import Image from 'next/image';
import Link from 'next/link';
import RoutineList from './components/RoutineList';
import PlusRoutineBtn from '@/components/common/PlusRoutineBtn';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getRoutineList } from '@/app/api/routine';

export default async function Home() {
  const session = await auth();
  console.log(session);
  if (!session) {
    redirect('/sign');
  }
  if (session?.nickname === null) {
    redirect('/sign/additional-info');
  }
  // TODO : 만료된 토큰 재발급 처리 with refresh token
  const routineList = await getRoutineList();
  return (
    <div className="flex flex-col h-screen bg-backgrounds-default">
      <div className="absolute inset-0 w-full h-[228px] bg-gradient-to-b from-[#2B3F58] to-[#212227] z-0"></div>

      <div className="z-10">
        <div className="w-full h-16 flex items-center mb-2 px-5">
          <Link
            href="./exercise-list/search"
            className="flex items-center w-full h-10 text-sm leading-5 py-2.5 rounded-6 bg-[#324151]"
          >
            <Image className="m-2" src={'/assets/search.svg'} width={24} height={24} alt="돋보기" />
            <span className="text-text-light">궁금한 운동이 있으신가요?!!</span>
          </Link>
        </div>
        <h4 className="text-[18px] font-semibold leading-[26px] py-2 pl-5 text-text-main">
          내 루틴
        </h4>

        <RoutineList routineList={routineList?.routineDtos} />
        <PlusRoutineBtn href="/routine/new" />
      </div>
    </div>
  );
}
