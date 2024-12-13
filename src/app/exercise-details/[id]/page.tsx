import React from 'react';
import ExerciseDetails from './hydrated-page';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/GetQueryClient';
import { getServerComment, getServerDetailsInfo } from '@/app/api/exercise-details';

const HydratedExerciseDetails = async ({ params }: { params: { id: string } }) => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  const id = params.id;
  const source = 'default';
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['get_comment', id, source],
    queryFn: ({ pageParam = { lastId: null, size: 10 } }) =>
      getServerComment({
        id,
        source,
        lastId: pageParam.lastId,
        size: pageParam.size,
      }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: { lastId: null, size: 10 },
    getNextPageParam: (lastPage: any) => {
      const lastComment = lastPage?.data?.commentList?.[lastPage.data.commentList.length - 1];
      const nextLastId = lastComment ? lastComment.exerciseCommentId : null;
      return lastPage?.data?.hasNext ? { lastId: nextLastId, size: 10 } : undefined;
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['get_detail_exercise_info', id, source],
    queryFn: () => getServerDetailsInfo({ id, source }),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col min-h-[calc(100vh)] bg-backgrounds-default text-text-main">
        <ExerciseDetails />
      </div>
    </HydrationBoundary>
  );
};

export default HydratedExerciseDetails;
