import WeightReps from './WeightReps';
import Reps from './Reps';
import Time from './Time';
import { ExerciseSet } from '../types';

interface ExerciseDetail {
  recordDetailId: number;
  exerciseId: number;
  gifUrl: string;
  detailsReps: number;
  detailsSets: number;
  detailsVolume: number;
  exerciseName: string;
  exerciseType: string;
  max1RM: number;
  sets: ExerciseSet[];
}

interface CompleteExerciseListProps {
  details: ExerciseDetail[];
}

const CompleteExerciseList = ({ details }: CompleteExerciseListProps) => {
  return (
    <div className="flex flex-col overflow-y-scroll pt-[162px]">
      {details.map((detail) => {
        const { exerciseType, exerciseName, detailsSets, detailsReps, max1RM, sets } = detail;

        const detailsText = `${detailsSets}세트 • ${detailsReps}회 • ${detail.detailsVolume}kg`;

        switch (exerciseType) {
          case '무게와 횟수':
            return (
              <WeightReps
                key={detail.recordDetailId}
                exerciseName={exerciseName}
                details={detailsText}
                max1RM={max1RM}
                gifUrl={detail.gifUrl}
                sets={sets}
              />
            );
          case '횟수':
            return (
              <Reps
                key={detail.recordDetailId}
                exerciseName={exerciseName}
                details={detailsText}
                sets={sets}
              />
            );
          case '시간 단위':
            return (
              <Time
                key={detail.recordDetailId}
                exerciseName={exerciseName}
                details={detailsText}
                sets={sets}
              />
            );
          default:
            return <div>뭐임{exerciseType}</div>;
        }
      })}
    </div>
  );
};

export default CompleteExerciseList;
