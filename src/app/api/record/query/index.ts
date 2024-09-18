import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRecord, getRecord, getRecordPayload } from '..';
import { RoutineRecord } from '@/app/record/types/record';

export const useRecord = ({ year, month, session }: getRecordPayload) => {
  return useQuery({
    queryKey: ['get_record', year, month],
    queryFn: () => getRecord({ year, month, session }),
  });
};

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString();

  const deleteRecordMutation = useMutation({
    mutationFn: deleteRecord,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['get_record', year, month] });

      const previousRecords = queryClient.getQueryData(['get_record', year, month]);
      queryClient.setQueryData(['get_record', year, month], (oldRecords: any) => {
        if (!oldRecords || !oldRecords.data || !oldRecords.data.records) return oldRecords;

        return {
          ...oldRecords,
          data: {
            ...oldRecords.data,
            records: oldRecords.data.records.filter(
              (record: RoutineRecord) => record.recordId !== data.recordId
            ),
          },
        };
      });

      return { previousRecords };
    },

    onError: (_error, _deletedRecordId, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(['get_record', year, month], context.previousRecords);
      }
      alert('삭제에 실패했습니다.');
    },

    onSuccess: () => {
      alert('기록이 삭제되었습니다.');
    },
  });

  return deleteRecordMutation;
};
