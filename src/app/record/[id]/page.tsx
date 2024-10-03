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
  console.log(recordId);
  const queryClient = getQueryClient();
  const session = await auth();

  await queryClient.prefetchQuery({
    queryKey: ['record', recordId],
    queryFn: () => getRecordDetail(recordId, session),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col text-text-main overflow-hidden bg-backgrounds-default">
        <RoutineComplete recordId={recordId} />
      </div>
    </HydrationBoundary>
  );
};

export default HydratedRoutineComplete;
