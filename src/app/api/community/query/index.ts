import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getArticleCommunity,
  AricleCommunityPayload,
  postArticleCommunity,
  deleteArticleCommunity,
  postArticleLikeCommunity,
  getArticleInformCommunity,
  ArticleInformGetCommunityPayload,
} from '..';
import { tree } from 'next/dist/build/templates/app-page';

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

export const useArticleInformCommunity = ({
  session,
  articleId,
  boardInformData,
}: ArticleInformGetCommunityPayload) => {
  return useQuery({
    queryKey: ['Article_Inform'],
    queryFn: () =>
      getArticleInformCommunity({
        session,
        articleId,
      }),
    initialData: boardInformData,
  });
};

export const useArticlePostCommunityMutation = () => {
  const articlePostCommunityMutation = useMutation({
    mutationFn: postArticleCommunity,
    onSuccess: () => {
      alert('게시글이 작성되었씁니다 !');
    },
  });

  return articlePostCommunityMutation;
};

export const useArticleDeleteCommunityMutation = () => {
  const articlePostCommunityMutation = useMutation({
    mutationFn: deleteArticleCommunity,
    onSuccess: () => {
      alert('게시글이 삭제되었습니다 !');
    },
  });

  return articlePostCommunityMutation;
};

export const useArticlePostLikeCommunityMutation = () => {
  const queryClient = useQueryClient();
  const articlePostCommunityMutation = useMutation({
    mutationFn: postArticleLikeCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Article_Inform'] });
    },
  });

  return articlePostCommunityMutation;
};
