import React from 'react';
import RoutineComplete from './hydrated-page';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { auth } from '@/auth';
import { getQueryClient } from '@/lib/GetQueryClient';
import { getRecordDetail } from '@/app/api/record';

interface RoutineCompleteProps {
  params: {
    id: string;
  };
}

const HydratedRoutineComplete = async ({ params }: RoutineCompleteProps) => {
  const recordId = params.id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['Record_Detail', recordId],
    queryFn: () => getRecordDetail(recordId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col text-text-main overflow-hidden bg-backgrounds-default">
        <RoutineComplete />
      </div>
    </HydrationBoundary>
  );
};

export default HydratedRoutineComplete;
