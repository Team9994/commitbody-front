import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteCustomExercise,
  getSearchExercise,
  postCustomExercise,
  postLikeRegister,
  putCustomExercise,
} from '..';
import { Filters } from '@/app/exercise-list/types';
import { useRouter } from 'next/navigation';

export const useSearchExercise = (filters: Filters) => {
  return useInfiniteQuery({
    queryKey: ['Search_Result', filters],
    queryFn: ({ pageParam = { from: 0, size: 20 } }) =>
      getSearchExercise({
        filters,
        size: pageParam.size,
        from: pageParam.from,
      }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: { from: 0, size: 20 },
    getNextPageParam: (_lastPage, allPages) => {
      const nextFrom = allPages.length * 20;
      return allPages[allPages.length - 1].length === 20 ? { from: nextFrom, size: 20 } : undefined;
    },
    enabled: false,
  });
};

export const useCustomExerciseMutation = () => {
  const customExerciseCreateMutation = useMutation({
    mutationFn: postCustomExercise,
  });
  return customExerciseCreateMutation;
};

export const useCustomExerciseEditMutation = () => {
  const customExerciseEditMutation = useMutation({
    mutationFn: putCustomExercise,
  });

  return customExerciseEditMutation;
};

// 낙관적 업데이트 vs 성공시 수동 캐시수정
// - 낙관적 업데이트
//  서버가 느릴 때 사용자 경험 상승
//  복잡도 상승 (API 요청 실패시 롤백 필요)
// - 성공시 수동 캐시 수정
//  성공했을 때 수동으로 캐시 수정
//  복잡도 상대적으로 낮음
export const useLikeRegister = (filters: Filters) => {
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

export const useDetailLikeRegister = () => {
  const queryClient = useQueryClient();
  const postDetailLikeRegisterMutation = useMutation({
    mutationFn: postLikeRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get_detail_exercise_info'] });
    },
    onError: (error) => {
      console.error('Error registering like:', error);
    },
  });
  return { postDetailLikeRegisterMutation };
};

export const useDeleteCustomExerciseMutation = () => {
  const router = useRouter();
  const deleteCustomExerciseMutation = useMutation({
    mutationFn: deleteCustomExercise,
    onSuccess: () => {
      alert('커스텀 운동이 삭제되었습니다.');
      router.back();
    },
  });

  return { deleteCustomExerciseMutation };
};
