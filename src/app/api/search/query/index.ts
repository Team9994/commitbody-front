import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSearchRecord, getSearchRecord, postSearchRecord } from '..';

export const useGetSearchRecord = ({ session }: { session: any }) => {
  return useQuery({
    queryKey: ['search_record'],
    queryFn: () => getSearchRecord({ session }),
    staleTime: 0,
    gcTime: 0,
    enabled: !!session,
  });
};

export const usePostSearchRecordMutation = () => {
  const queryClient = useQueryClient();
  const postSearchRecordMutation = useMutation({
    mutationFn: postSearchRecord,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['search_record'] });
    },
  });

  return postSearchRecordMutation;
};

export const useDeleteSearchRecordMutation = () => {
  const queryClient = useQueryClient();
  const deleteSearchRecordMutation = useMutation({
    mutationFn: deleteSearchRecord,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['search_record'] });
    },
  });

  return deleteSearchRecordMutation;
};
