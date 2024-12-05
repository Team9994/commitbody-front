'use client';
import CompleteExerciseList from './components/CompleteExerciseList';
import RoutineCompleteHeader from './components/CompleteHeader';
import useRecord from './hooks/useRecord';

const RoutineComplete = () => {
  const { recordDetail } = useRecord();

  if (!recordDetail) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <RoutineCompleteHeader
        recordName={recordDetail.recordName}
        startDate={recordDetail.startDate}
        durationTime={recordDetail.durationTime}
        recordVolume={recordDetail.recordVolume}
        recordSets={recordDetail.recordSets}
        recordCalorie={recordDetail.recordCalorie}
      />
      {recordDetail && <CompleteExerciseList details={recordDetail.details} />}
    </div>
  );
};

export default RoutineComplete;
