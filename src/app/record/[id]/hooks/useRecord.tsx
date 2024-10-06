'use client';
import { useRecordDetail } from '@/app/api/record/query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useParams } from 'next/navigation';

const useRecord = () => {
  const params = useParams();
  const recordId = params.id as string;
  // console.log(recordId);
  const { data: session } = useSession();
  const { data: recordDetail, isFetching, refetch } = useRecordDetail(recordId, session);

  return { recordDetail };
};

export default useRecord;
