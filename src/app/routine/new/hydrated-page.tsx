'use client';
import PlusRoutineBtn from '@/components/common/PlusRoutineBtn';
import RoutineNameInput from './components/RoutineNameInput';
import SelectedRoutineList from './components/SelectedRoutineList';
import useRoutineNew from './hooks/useRoutineNew';
import Header from '@/components/layouts/Header';
import Link from 'next/link';
import Image from 'next/image';

const RoutineNew = () => {
  const { routineName, onChange, routines, saveRoutine } = useRoutineNew();
  return (
    <div className="relative w-full max-w-[500px]">
      <Header
        className={'bg-backgrounds-default'}
        left={
          <Link href="/">
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </Link>
        }
        right={<div className="text-base text-blue font-semibold">저장</div>}
        onRightClick={saveRoutine}
      />
      <RoutineNameInput routineName={routineName} onChange={onChange} />
      <SelectedRoutineList routines={routines} />
      <PlusRoutineBtn href="/exercise-list/routine" />
    </div>
  );
};

export default RoutineNew;
