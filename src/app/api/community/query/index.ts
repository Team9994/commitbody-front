import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getArticleCommunity, AricleCommunityPayload, postArticleCommunity } from '..';

type ArticleCommunityBasicInfo = Pick<AricleCommunityPayload, 'type' | 'category' | 'session'>;

export const useArticleCommunity = ({ category, type, session }: ArticleCommunityBasicInfo) => {
  return useInfiniteQuery({
    queryKey: ['Article_Result', category, type],
    queryFn: ({ pageParam = { lastId: undefined, size: 20 } }) =>
      getArticleCommunity({
        session,
        category,
        type,
        size: pageParam.size,
        lastId: pageParam.lastId,
      }),
    staleTime: 1000 * 60,
    initialPageParam: { lastId: undefined, size: 20 },
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.data.articles.length === 0) {
        return undefined;
      }
      console.log(lastPage);
      const lastId = lastPage.data.articles[lastPage.data.articles.length - 1]?.articleId;
      console.log(lastId);
      return lastPage.data.articles.length === 20 ? { lastId: lastId, size: 20 } : undefined;
    },
    enabled: false,
  });
};

export const useArticlePostCommunityMutation = () => {
  const articlePostCommunityMutation = useMutation({
    mutationFn: postArticleCommunity,
  });

  return articlePostCommunityMutation;
};
