import React from 'react';
import ExerciseList from './hydrated-page';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { auth } from '@/auth';
import { getQueryClient } from '@/lib/GetQueryClient';

const HydratedExerciseList = async () => {
  const queryClient = getQueryClient();
  const session = await auth();
  if (!session) {
    return {
      redirect: {
        destination: '/sign',
        permanent: false,
      },
    };
  }
  // void queryClient.prefetchQuery({
  //   queryKey: ['exercise_search', session],
  //   queryFn: () => getSearchExercise(session),
  // });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div
        className="flex flex-col bg-backgrounds-default text-text-main overflow-hidden"
        style={{ height: 'calc(100vh - 48px)' }}
      >
        <ExerciseList />
      </div>
    </HydrationBoundary>
  );
};

export default HydratedExerciseList;
