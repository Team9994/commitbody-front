import React from 'react';
import ExerciseDetails from './hydrated-page';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/GetQueryClient';
import { auth } from '@/auth';
import { getComment, getDetailsInfo } from '@/app/api/exercise-details';

const HydratedExerciseDetails = async ({ params }: { params: { id: string } }) => {
  const queryClient = getQueryClient();
  const session = await auth();
  const dehydratedState = dehydrate(queryClient);
  const id = params.id;
  const source = 'default';
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['get_comment', id, session, source],
    queryFn: ({ pageParam = { lastId: null, size: 10 } }) =>
      getComment({
        session,
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
  console.log(session);
  await queryClient.prefetchQuery({
    queryKey: ['get_detail_exercise_info', id, session, source],
    queryFn: () => getDetailsInfo({ id, session, source }),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col min-h-[calc(100vh-48px)] bg-backgrounds-default text-text-main">
        <ExerciseDetails />
      </div>
    </HydrationBoundary>
  );
};

export default HydratedExerciseDetails;
