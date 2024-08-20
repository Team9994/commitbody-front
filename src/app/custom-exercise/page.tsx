import React from 'react';
import ExerciseCustom from './hydrated-page';

const HydratedExerciseCustom = () => {
  return (
    <div className="flex flex-col h-screen bg-backgrounds-default text-text-main">
      <ExerciseCustom />
    </div>
  );
};

export default HydratedExerciseCustom;
