'use client';
import RoutineNameInput from '../components/RoutineNameInput';
import SelectedRoutineList from '../components/SelectedRoutineList';
import useRoutineNew from '../hooks/useRoutineNew';

const RoutineNew = () => {
  const { routineName, onChange, routines } = useRoutineNew();
  return (
    <>
      <RoutineNameInput routineName={routineName} onChange={onChange} />
      <SelectedRoutineList routines={routines} />
    </>
  );
};

export default RoutineNew;