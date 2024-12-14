import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotification, postLogout, postNotification, postWithDraw } from '..';

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};

export const useWithdrawMutation = () => {
  return useMutation({
    mutationFn: postWithDraw,
  });
};

export const useNotificationQuery = () => {
  return useQuery({
    queryKey: ['notificationSettings'],
    queryFn: () => getNotification(),
  });
};

export const useNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationSettings'] });
    },
  });
};
