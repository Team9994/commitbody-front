import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSearchExercise, postCustomExercise, postLikeRegister } from '..';
import { Filters } from '@/app/exercise-list/types';

export const useSearchExercise = (filters: Filters, session: any) => {
  return useInfiniteQuery({
    queryKey: ['Search_Result', filters],
    queryFn: ({ pageParam = { from: 0, size: 20 } }) =>
      getSearchExercise({
        session,
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
  return useMutation({
    mutationFn: postCustomExercise,
  });
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
