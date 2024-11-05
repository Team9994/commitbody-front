import useInput from '@/hooks/useInput';
import useRoutineStore from '@/store/routine';

const useRoutineNew = () => {
  const { routines } = useRoutineStore();
  const { value: routineName, onChange } = useInput('');

  const saveRoutine = () => {
    const requestBody = {
      routineName: routineName,
      routineExercises: routines.map((exercise: any, index: number) => ({
        exerciseId: exercise.id,
        order: index + 1,
        source: 'default',
      })),
    };
    console.log(requestBody);
  };

  return {
    routineName,
    onChange,
    routines,
    saveRoutine,
  };
};

export default useRoutineNew;
