import React from 'react';
import ExerciseDetails from './hydrated-page';

const HydratedExerciseDetails = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-48px)] bg-backgrounds-default text-text-main">
      <ExerciseDetails />
    </div>
  );
};

export default HydratedExerciseDetails;
