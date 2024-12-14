'use client';
import { useRecordDetail } from '@/app/api/record/query';
import { useParams } from 'next/navigation';

const useRecord = () => {
  const params = useParams();
  const recordId = params.id as string;
  const { data: recordDetail, isFetching, refetch } = useRecordDetail(recordId);

  return { recordDetail };
};

export default useRecord;
