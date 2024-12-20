import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getUserArticle, getUserInfo } from '..';

export const useGetUserInfo = ({ nickname }: { nickname: string }) => {
  return useQuery({
    queryKey: ['user_info', nickname],
    queryFn: () => getUserInfo(nickname),
  });
};

export const useUserArticle = ({
  type,
  id,
}: {
  type: 'EXERCISE' | 'INFO_QUESTION';
  id: string;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: id ? ['User_Article', type, id] : [],
    queryFn: ({ pageParam = { lastId: undefined, size: 20 } }) =>
      getUserArticle({
        type,
        size: pageParam.size,
        id: id,
        lastId: pageParam.lastId,
      }),
    staleTime: 60 * 1000,
    initialPageParam: { lastId: undefined, size: 20 },
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      if (!lastPage || !lastPage?.data?.hasNext) return undefined;
      return {
        lastId: lastPage.data.articles[lastPage.data.articles.length - 1]?.articleId,
        size: 20,
      };
    },
  });
};
