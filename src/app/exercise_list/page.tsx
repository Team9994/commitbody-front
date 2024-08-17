import React from 'react';
import ExerciseList from './hydrated-page';

//하이드레이션
const HydratedExerciseList = () => {
  return (
    <div className="flex flex-col h-screen bg-backgrounds-default text-text-main">
      <ExerciseList />
    </div>
  );
};

export default HydratedExerciseList;
