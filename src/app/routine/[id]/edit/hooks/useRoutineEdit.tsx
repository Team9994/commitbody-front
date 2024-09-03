'use client';
import useRoutineStore from '@/store/routine';

const useRoutineEdit = () => {
  const { routines } = useRoutineStore();

  return {
    routines,
  };
};

export default useRoutineEdit;
