import { getRecordDetail } from '@/app/api/record';
import { useQuery } from '@tanstack/react-query';

export const useRecordDetail = (recordId: string, session: any) => {
  return useQuery({
    queryKey: ['Record_Detail', recordId],
    queryFn: () => getRecordDetail(recordId, session),
    staleTime: 1000 * 60 * 5,
    enabled: !!recordId && !!session,
  });
};
