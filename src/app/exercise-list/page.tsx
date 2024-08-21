import React from 'react';
import ExerciseList from './hydrated-page';

const HydratedExerciseList = () => {
  return (
    <div
      className="flex flex-col bg-backgrounds-default text-text-main overflow-hidden"
      style={{ height: 'calc(100vh - 48px)' }}
    >
      <ExerciseList />
    </div>
  );
};

export default HydratedExerciseList;
