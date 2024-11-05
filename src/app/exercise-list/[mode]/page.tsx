import React from 'react';
import ExerciseList from './hydrated-page';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { auth } from '@/auth';
import { getQueryClient } from '@/lib/GetQueryClient';
import { getSearchExercise } from '@/app/api/exercise';

const HydratedExerciseList = async () => {
  const queryClient = getQueryClient();
  const session = await auth();
  const filters = {
    name: '',
    target: '',
    equipment: '',
    source: '',
    favorite: null,
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['Search_Result', filters],
    queryFn: ({ pageParam = { from: 0, size: 20 } }) =>
      getSearchExercise({
        session,
        filters,
        size: pageParam.size,
        from: pageParam.from,
      }),
    initialPageParam: undefined,
    staleTime: 1000 * 60,
  });

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
