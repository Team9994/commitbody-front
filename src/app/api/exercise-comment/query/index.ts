import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment, postComment, postCommentLike } from '..';

export const useCommentDeleteMutation = (id: string, session: any, type: 'custom' | 'default') => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      queryClient.refetchQueries({ queryKey: ['get_comment', id, session, type] });
    },
  });

  return { deleteMutation };
};
export const useCommentPostLikeMutation = (
  id: string,
  session: any,
  type: 'custom' | 'default'
) => {
  const queryClient = useQueryClient();
  const postCommentLikeMutation = useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['get_comment', id, session, type] });
    },
  });

  return { postCommentLikeMutation };
};

export const useCommentPostMutation = (id: string, session: any, type: 'custom' | 'default') => {
  const queryClient = useQueryClient();
  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      alert('댓글이 등록되었습니다.');
      queryClient.refetchQueries({ queryKey: ['get_comment', id, session, type] });
    },
  });

  return { postCommentMutation };
};
