import { postRoutine } from '@/app/api/routine';
import useInput from '@/hooks/useInput';
import useRoutineStore from '@/store/routine';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const useRoutineNew = () => {
  const { routines } = useRoutineStore();
  const { value: routineName, onChange } = useInput('');
  const { data: session } = useSession();
  const router = useRouter();

  const saveRoutine = async () => {
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
      console.log(response);
      // router.push('/');
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
