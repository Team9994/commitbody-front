import React from 'react';
import ExerciseList from './hydrated-page';

const HydratedExerciseList = () => {
  return (
    <div className="flex flex-col bg-backgrounds-default text-text-main overflow-hidden">
      <ExerciseList />
    </div>
  );
};

export default HydratedExerciseList;
