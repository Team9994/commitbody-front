import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '..';

export const useCommentDeleteMutation = (id: string, session: any, type: 'custom' | 'default') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      // queryClient.invalidateQueries({ queryKey: ['get_comment', id, session, type] });
      queryClient.refetchQueries({ queryKey: ['get_comment', id, session, type] });
    },
    onError: (error) => {
      console.error('삭제 중 오류가 발생했습니다.', error);
    },
  });
};
