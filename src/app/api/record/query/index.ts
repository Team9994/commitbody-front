import { getRecordDetail, getRecord, deleteRecord } from '@/app/api/record';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RoutineRecord } from '@/app/record/types/record';

export const useRecordDetail = (recordId: string, session: any) => {
  return useQuery({
    queryKey: ['Record_Detail', recordId],
    queryFn: () => getRecordDetail(recordId, session),
    staleTime: 1000 * 60 * 5,
    enabled: !!recordId && !!session,
  });
};

interface UseRecordPayload {
  year: string;
  month: string;
  session: any;
}

export const useRecord = ({ year, month, session }: UseRecordPayload) => {
  return useQuery({
    queryKey: ['get_record', year, month],
    queryFn: () => getRecord({ year, month, session }),
    staleTime: 1000 * 60 * 5,
    enabled: !!year && !!month && !!session,
  });
};

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();

  const deleteRecordMutation = useMutation({
    mutationFn: deleteRecord,

    onMutate: async (data) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString();

      await queryClient.cancelQueries({ queryKey: ['get_record', year, month] });

      const previousRecords = queryClient.getQueryData(['get_record', year, month]);

      queryClient.setQueryData(['get_record', year, month], (oldRecords: any) => {
        if (!oldRecords || !oldRecords.data || !oldRecords.data.records) return oldRecords;

        return {
          ...oldRecords,
          data: {
            ...oldRecords.data,
            records: oldRecords.data.records.filter(
              (record: RoutineRecord) => record.recordId !== Number(data.recordId)
            ),
          },
        };
      });

      return { previousRecords };
    },

    onError: (_error, _deletedRecordId, context) => {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString();

      if (context?.previousRecords) {
        queryClient.setQueryData(['get_record', year, month], context.previousRecords);
      }
      alert('삭제에 실패했습니다.');
    },

    onSuccess: () => {
      alert('기록이 삭제되었습니다.');
    },

    onSettled: () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString();

      queryClient.invalidateQueries({ queryKey: ['get_record', year, month] });
    },
  });

  return deleteRecordMutation;
};
