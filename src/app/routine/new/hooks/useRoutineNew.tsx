import { postRoutine } from '@/app/api/routine';
import useRoutineStore, { useRoutineInputStore } from '@/store/routine';
import { useRouter } from 'next/navigation';

const useRoutineNew = () => {
  const { routines, clearRoutines } = useRoutineStore();
  const { routineName, onChange, setInput } = useRoutineInputStore();
  const router = useRouter();

  const saveRoutine = async () => {
    if (!routineName) {
      alert('루틴이름을 입력해주세요.');
      return;
    }
    const requestBody = {
      routineName: routineName,
      routineExercises: routines.map((exercise: any, index: number) => ({
        exerciseId: exercise.id,
        order: index + 1,
        source: 'default',
      })),
    };
    console.log(requestBody);
    try {
      const response = await postRoutine(requestBody);
      clearRoutines();
      setInput('');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return {
    routineName,
    onChange,
    routines,
    saveRoutine,
  };
};

export default useRoutineNew;
