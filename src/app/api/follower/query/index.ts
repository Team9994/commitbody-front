import { useMutation } from '@tanstack/react-query';
import { postFollower } from '..';

export const usePostFollowerMutation = () => {
  const PostFollowerMutation = useMutation({
    mutationFn: postFollower,
  });

  return { PostFollowerMutation };
};
