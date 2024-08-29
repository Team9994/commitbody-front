import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCustomExercise, postLikeRegister } from '..';

export const useCustomExerciseMutation = () => {
  return useMutation({
    mutationFn: postCustomExercise,
  });
};

export const useLikeRegister = (filters: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLikeRegister,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['Search_Result', filters], (oldData: any) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page: any) => {
          return page.map((item: any) => {
            if (item.exerciseId === variables.exerciseId) {
              return {
                ...item,
                interest: !item.interest,
              };
            }
            return item;
          });
        });

        return {
          ...oldData,
          pages: newPages,
        };
      });
    },
    onError: (error) => {
      console.error('Error registering like:', error);
    },
  });
};
