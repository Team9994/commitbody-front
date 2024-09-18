import React from 'react';
import Record from './hydrated-page';
import { getQueryClient } from '@/lib/GetQueryClient';
import { getRecord } from '../api/record';
import { auth } from '@/auth';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const HydratedRecord = async () => {
  const queryClient = getQueryClient();
  const session = await auth();

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString();

  await queryClient.prefetchQuery({
    queryKey: ['get_record', year, month],
    queryFn: () => getRecord({ year, month, session }),
    staleTime: 60 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Record />
    </HydrationBoundary>
  );
};

export default HydratedRecord;
