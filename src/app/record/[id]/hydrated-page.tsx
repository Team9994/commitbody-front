'use client';
import CompleteExerciseList from './components/CompleteExerciseList';
import RoutineCompleteHeader from './components/CompleteHeader';
import useRecord from './hooks/useRecord';

const RoutineComplete = () => {
  const { recordDetail } = useRecord();
  console.log(recordDetail);
  const mock_record = {
    recordId: 41,
    recordName: '목요일루틴',
    startDate: '2024.10.03.(목)',
    durationTime: '7:13~7:13',
    duration: 0,
    recordVolume: 160,
    recordSets: 12,
    recordCalorie: 0,
    details: [
      {
        recordDetailId: 1108,
        exerciseId: 1,
        gifUrl: 'https://v2.exercisedb.io/image/07FleH2Q-r0kcN',
        detailsReps: 100,
        detailsSets: 4,
        detailsVolume: 0,
        exerciseName: '벤치프레스',
        exerciseType: '횟수',
        max1RM: 0,
        sets: [
          {
            setId: 2347,
            weight: 0,
            reps: 10,
            time: 0,
          },
          {
            setId: 2348,
            weight: 0,
            reps: 10,
            time: 0,
          },
          {
            setId: 2349,
            weight: 0,
            reps: 10,
            time: 0,
          },
          {
            setId: 2350,
            weight: 0,
            reps: 10,
            time: 0,
          },
        ],
      },
      {
        recordDetailId: 1109,
        exerciseId: 7,
        gifUrl: 'https://v2.exercisedb.io/image/Vt8LgXODVfaYME',
        detailsReps: 40,
        detailsSets: 4,
        detailsVolume: 1100,
        exerciseName: '인클라인 덤벨 프레스',
        max1RM: 36,
        exerciseType: '무게와 횟수',
        sets: [
          {
            setId: 2351,
            weight: 10,
            reps: 10,
            time: 0,
          },
          {
            setId: 2352,
            weight: 20,
            reps: 10,
            time: 0,
          },
          {
            setId: 2353,
            weight: 30,
            reps: 10,
            time: 0,
          },
          {
            setId: 2354,
            weight: 50,
            reps: 10,
            time: 0,
          },
          {
            setId: 2355,
            weight: 10,
            reps: 10,
            time: 0,
          },
          {
            setId: 2356,
            weight: 10,
            reps: 10,
            time: 0,
          },
        ],
      },
      {
        recordDetailId: 1110,
        exerciseId: 9,
        gifUrl: 'https://v2.exercisedb.io/image/abo2B2S9qxbuGB',
        detailsReps: 38,
        detailsSets: 2,
        detailsVolume: 920,
        exerciseName: '머신 디클라인 프레스',
        exerciseType: '무게와 횟수',
        max1RM: 40,
        sets: [
          {
            setId: 2355,
            weight: 10,
            reps: 10,
            time: 0,
          },
          {
            setId: 2356,
            weight: 40,
            reps: 10,
            time: 0,
          },
        ],
      },
      {
        recordDetailId: 1111,
        exerciseId: 112,
        gifUrl: 'https://v2.exercisedb.io/image/vyUrOb3hKBNQEl',
        detailsReps: 0,
        detailsSets: 2,
        detailsVolume: 0,
        exerciseName: '딥스',
        exerciseType: '시간 단위',
        max1RM: 0,
        sets: [
          {
            setId: 2357,
            weight: 0,
            reps: 0,
            time: 10,
          },
          {
            setId: 2358,
            weight: 0,
            reps: 0,

            time: 10,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <RoutineCompleteHeader
        recordName={recordDetail.recordName}
        startDate={recordDetail.startDate}
        durationTime={recordDetail.durationTime}
        recordVolume={recordDetail.recordVolume}
        recordSets={recordDetail.recordSets}
        recordCalorie={recordDetail.recordCalorie}
      />
      {recordDetail && <CompleteExerciseList details={mock_record.details} />}
    </div>
  );
};

export default RoutineComplete;
