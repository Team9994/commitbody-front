import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDeleteRoutine } from '..';

export const useDeleteRoutineMutation = () => {
  const deleteRoutineMutation = useMutation({
    mutationFn: deleteDeleteRoutine,
  });

  return { deleteRoutineMutation };
};
