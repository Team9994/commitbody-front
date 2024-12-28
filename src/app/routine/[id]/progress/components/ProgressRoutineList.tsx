'use client';
import React, { useState, useEffect } from 'react';
import ExerciseSetInfo from './ExerciseSetInfo';
import { EXERCISE_TYPE } from '@/constants/exerciseType';
import { RoutineDetail, SetInfo } from '../types';
import { postRegisterRecord } from '@/app/api/record';
import { useRouter } from 'next/navigation';
import TimeBox from './TimeBox';
import Header from '@/components/layouts/Header';
import Back from '@/components/common/Back';

interface ProgressRoutineListProps {
  routineDetails: {
    routineId: string;
    routineName: string;
    targets: string[];
    exercises: RoutineDetail[];
  };
}

const ProgressRoutineList = (props: ProgressRoutineListProps) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [exercises, setExercises] = useState<RoutineDetail[] | null>(
    props?.routineDetails?.exercises
  );
  const [allSetInfos, setAllSetInfos] = useState<SetInfo[][]>([]);
  const [exerciseDurationSeconds, setExerciseDurationSeconds] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  useEffect(() => {
    if (!props?.routineDetails?.exercises) {
      console.error('routineDetails.exercises is undefined or not an array');
      return;
    }
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

    setAllSetInfos(initialSetInfos);
  }, [props?.routineDetails?.exercises]);

  const updateSetInfo = (exerciseIndex: number, setInfos: SetInfo[]) => {
    const newAllSetInfos = [...allSetInfos];
    newAllSetInfos[exerciseIndex] = setInfos;
    setAllSetInfos(newAllSetInfos);
  };

  const handleSubmit = async () => {
    const endTime = new Date(startTime!.getTime() + exerciseDurationSeconds * 1000);
    console.log(startTime);
    console.log(endTime);
    const dataToSend = {
      recordName: props.routineDetails.routineName,
      startTime: startTime!.toISOString(),
      endTime: endTime.toISOString(),
      exercises: props.routineDetails.exercises.map((exercise, index) => ({
        recordDetailId: exercise.exerciseId,
        endTime: new Date().toISOString(),
        recordName: props.routineDetails.routineName,
        orders: exercise.orders,
        exerciseId: exercise.exerciseId,
        source: exercise.source,
        sets: allSetInfos[index]
          .map((setInfo) => {
            const set: {
              weight?: number;
              times?: number;
              reps?: number;
            } = {};
            if (exercise.exerciseType === '무게와 횟수') {
              if (
                setInfo.weight !== undefined &&
                setInfo.weight !== 0 &&
                setInfo.reps !== undefined &&
                setInfo.reps !== 0
              ) {
                set.weight = setInfo.weight;
                set.reps = setInfo.reps;
              }
            } else if (exercise.exerciseType === '시간 단위') {
              if (setInfo.time !== undefined && setInfo.time !== 0) {
                set.times = setInfo.time;
              }
            } else if (exercise.exerciseType === '횟수') {
              if (setInfo.reps !== undefined && setInfo.reps !== 0) {
                set.reps = setInfo.reps;
              }
            }
            return set;
          })
          .filter((set) => Object.keys(set).length > 0),
      })),
    };
    // 빈 세트 배열 체크
    const hasEmptySets = dataToSend.exercises.some((exercise) => exercise.sets.length === 0);

    if (hasEmptySets) {
      alert('모든 운동에 대해 최소한 하나의 유효한 세트를 입력해주세요.');
      return;
    }
    console.log(dataToSend);
    try {
      const response = await postRegisterRecord(dataToSend);
      // 라우터 이동
      console.log(response);
      router.push(`/record/${response}`);
    } catch (error) {
      console.error('Error submitting routine:', error);
    }
  };

  return (
    <div>
      <Header
        className={'bg-backgrounds-default'}
        left={
          <div>
            <Back />
          </div>
        }
        right={<h1 onClick={handleSubmit}>완료</h1>}
      />
      {exercises &&
        exercises.map((exercise, index) => (
          <div key={index} className="my-6 px-5">
            <h2 className="text-xl font-bold ">{exercise.exerciseName}</h2>
            <ExerciseSetInfo
              sets={exercise.sets}
              setInfos={allSetInfos[index]}
              onSetInfoChange={(setInfos) => updateSetInfo(index, setInfos)}
              exerciseType={exercise.exerciseType}
            />
          </div>
        ))}
      {/* <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
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
      </button> */}
      <TimeBox setExerciseDurationSeconds={setExerciseDurationSeconds} />
    </div>
  );
};

export default ProgressRoutineList;
