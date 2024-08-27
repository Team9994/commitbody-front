import useInput from '@/hooks/useInput';
import useRoutineStore from '@/store/routine';

const useRoutineNew = () => {
  const { routines } = useRoutineStore();
  const { value: routineName, onChange } = useInput('');

  return {
    routineName,
    onChange,
    routines,
  };
};

export default useRoutineNew;
