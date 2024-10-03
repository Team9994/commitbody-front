'use client';
import CompleteExerciseList from './components/CompleteExerciseList';
import RoutineCompleteHeader from './components/CompleteHeader';
import useRecord from './hooks/useRecord';

const RoutineComplete = (recordId: string) => {
  const { recordDetail } = useRecord();
  console.log(recordDetail);
  return (
    <div>
      <RoutineCompleteHeader />
      <CompleteExerciseList />
    </div>
  );
};

export default RoutineComplete;
