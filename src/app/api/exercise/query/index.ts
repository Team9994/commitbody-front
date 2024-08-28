import { useMutation } from '@tanstack/react-query';
import { postCustomExercise } from '..';

export const useCustomExerciseMutation = () => {
  return useMutation({
    mutationFn: postCustomExercise,
  });
};
