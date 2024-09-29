'use client';
import React, { useState, useEffect } from 'react';
import ExerciseSetInfo from './ExerciseSetInfo';
import { EXERCISE_TYPE } from '@/app/custom-exercise/constants/exerciseType';
import { RoutineDetail, SetInfo } from '../types';

interface ProgressRoutineListProps {
  routineDetails: RoutineDetail[];
}

const ProgressRoutineList = ({ routineDetails }: ProgressRoutineListProps) => {
  const [exercises, setExercises] = useState<RoutineDetail[]>(routineDetails);
  const [allSetInfos, setAllSetInfos] = useState<SetInfo[][]>([]);

  useEffect(() => {
    if (!routineDetails || !Array.isArray(routineDetails)) {
      console.error('routineDetails is undefined or not an array');
      return;
    }

    setExercises(routineDetails);

    const initialSetInfos = routineDetails.map((exercise) => {
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
  }, [routineDetails]);

  const updateSetInfo = (exerciseIndex: number, setInfos: SetInfo[]) => {
    const newAllSetInfos = [...allSetInfos];
    newAllSetInfos[exerciseIndex] = setInfos;
    setAllSetInfos(newAllSetInfos);
  };

  const handleSubmit = () => {
    // 모든 운동의 세트 정보를 포함한 데이터 전송
    const dataToSend = exercises.map((exercise, index) => ({
      routineDetailId: exercise.routineDetailId,
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      sets: allSetInfos[index],
    }));

    // 예시: API 요청
    /*
    fetch('/api/submitRoutine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        // 성공 처리
      })
      .catch(error => {
        // 에러 처리
      });
    */

    console.log('Submitting data:', dataToSend);
  };

  return (
    <div>
      {exercises &&
        exercises.map((exercise, index) => (
          <div key={exercise.routineDetailId} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{exercise.exerciseName}</h2>
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
    </div>
  );
};

export default ProgressRoutineList;
