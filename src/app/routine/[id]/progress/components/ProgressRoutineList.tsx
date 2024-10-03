'use client';
import React, { useState, useEffect } from 'react';
import ExerciseSetInfo from './ExerciseSetInfo';
import { EXERCISE_TYPE } from '@/app/custom-exercise/constants/exerciseType';
import { RoutineDetail, SetInfo } from '../types';
import { useSession } from 'next-auth/react';
import { postRegisterRoutine } from '@/app/api/routine';
import { useRouter } from 'next/navigation';

interface ProgressRoutineListProps {
  routineDetails: {
    routineId: string;
    routineName: string;
    targets: string[];
    exercises: RoutineDetail[];
  };
}

const ProgressRoutineList = (props: ProgressRoutineListProps) => {
  const [exercises, setExercises] = useState<RoutineDetail[]>(props.routineDetails.exercises);
  const [allSetInfos, setAllSetInfos] = useState<SetInfo[][]>([]);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(props.routineDetails);
  console.log(props.routineDetails.exercises);
  useEffect(() => {
    if (!props.routineDetails.exercises) {
      console.error('routineDetails.exercises is undefined or not an array');
      return;
    }
    console.log(props.routineDetails.exercises);

    setExercises(props.routineDetails.exercises);

    const initialSetInfos = props.routineDetails.exercises.map((exercise) => {
      switch (exercise.exerciseType) {
        case EXERCISE_TYPE['무게와 횟수']:
          return Array(exercise.sets).fill({ weight: 0, reps: 0 });
        case EXERCISE_TYPE['시간 단위']:
          return Array(exercise.sets).fill({ time: 0 });
        case EXERCISE_TYPE['횟수']:
          return Array(exercise.sets).fill({ reps: 0 });
        default:
          return Array(exercise.sets).fill({});
      }
    });
    console.log(initialSetInfos);

    setAllSetInfos(initialSetInfos);
  }, [props.routineDetails.exercises]);

  const updateSetInfo = (exerciseIndex: number, setInfos: SetInfo[]) => {
    const newAllSetInfos = [...allSetInfos];
    newAllSetInfos[exerciseIndex] = setInfos;
    setAllSetInfos(newAllSetInfos);
  };

  const handleSubmit = async () => {
    // 모든 운동의 세트 정보를 포함한 데이터 전송

    console.log(allSetInfos);
    const dataToSend = {
      recordName: props.routineDetails.routineName,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      exercises: props.routineDetails.exercises.map((exercise, index) => ({
        recordDetailId: exercise.routineDetailId,
        endTime: new Date().toISOString(),
        recordName: props.routineDetails.routineName,
        orders: exercise.orders,
        exerciseId: exercise.exerciseId,
        source: exercise.source,
        sets: allSetInfos[index].map((setInfo, setIndex) => ({
          weight: setInfo.weight || 0,
          times: setInfo.time || 0,
          reps: setInfo.reps || 0,
        })),
      })),
    };

    console.log(dataToSend);
    try {
      const response = await postRegisterRoutine(dataToSend, session);
      // 라우터 이동
      router.push(`/record/${response.data}`);
    } catch (error) {
      console.error('Error submitting routine:', error);
    }
  };

  return (
    <div>
      {exercises &&
        exercises.map((exercise, index) => (
          <div key={exercise.routineDetailId} className="my-6 px-5">
            <h2 className="text-xl font-bold ">{exercise.exerciseName}</h2>
            <ExerciseSetInfo
              sets={exercise.sets}
              setInfos={allSetInfos[index]}
              onSetInfoChange={(setInfos) => updateSetInfo(index, setInfos)}
              exerciseType={exercise.exerciseType}
            />
          </div>
        ))}
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        운동 완료 및 제출
      </button>
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        운동 완료 및 제출
      </button>
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        운동 완료 및 제출
      </button>
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        운동 완료 및 제출
      </button>
    </div>
  );
};

export default ProgressRoutineList;
