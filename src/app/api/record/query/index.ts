import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRecord, getRecord, getRecordPayload } from '..';

export const useRecord = ({ year, month, session }: getRecordPayload) => {
  return useQuery({
    queryKey: ['get_record', year, month],
    queryFn: () => getRecord({ year, month, session }),
  });
};

export const useDeleteRecordMutation = () => {
  const queryClient = useQueryClient();

  const deleteRecordMutation = useMutation({
    mutationFn: deleteRecord,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['get_record', '2024', '9'] });

      const previousRecords = queryClient.getQueryData(['get_record', '2024', '9']);
      console.log(previousRecords);
      queryClient.setQueryData(['get_record', '2024', '9'], (oldRecords: any) => {
        if (!oldRecords || !oldRecords.data || !oldRecords.data.records) return oldRecords; // 데이터가 예상과 다를 경우 그대로 반환

        return {
          ...oldRecords,
          data: {
            ...oldRecords.data,
            records: oldRecords.data.records.filter(
              (record: any) => record.recordId !== data.recordId
            ),
          },
        };
      });

      return { previousRecords };
    },

    onError: (_error, _deletedRecordId, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(['get_record', '2024', '9'], context.previousRecords);
      }
      alert('삭제에 실패했습니다.');
    },

    onSuccess: () => {
      alert('기록이 삭제되었습니다.');
    },
  });

  return deleteRecordMutation;
};
