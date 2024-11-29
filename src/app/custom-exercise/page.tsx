'use client';
import React, { Suspense } from 'react';
import ExerciseCustom from './hydrated-page';

const HydratedExerciseCustom = () => {
  return (
    <Suspense fallback={<div>Loading Exercise...</div>}>
      <div className="flex flex-col h-[calc(100vh-48px)] bg-backgrounds-default text-text-main">
        <ExerciseCustom />
      </div>
    </Suspense>
  );
};

export default HydratedExerciseCustom;
