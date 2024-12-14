import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getArticleCommunity,
  AricleCommunityPayload,
  postArticleCommunity,
  deleteArticleCommunity,
  postArticleLikeCommunity,
  getArticleInformCommunity,
  ArticleInformGetCommunityPayload,
  postArticleCommentCommunity,
  getArticleCommentInformCommunity,
  postArticleCommentLikeCommunity,
  deleteArticleCommentCommunity,
  getDetailCommentCommunity,
  AricleDetailCommentCommunityPayload,
} from '..';

export const useArticleDetailCommentCommunity = ({
  commentId,
  lastId,
  size = 50,
}: AricleDetailCommentCommunityPayload) => {
  return useQuery({
    queryKey: ['Article_Detail_Comment', commentId],
    queryFn: () => {
      return getDetailCommentCommunity({
        commentId,
        lastId,
        size,
      });
    },
    enabled: !!commentId,
  });
};

type ArticleCommunityBasicInfo = Pick<AricleCommunityPayload, 'type' | 'category'>;

export const useArticleCommunity = ({ category, type }: ArticleCommunityBasicInfo) => {
  return useInfiniteQuery({
    queryKey: ['Article_Result', category, type],
    queryFn: ({ pageParam = { lastId: undefined, size: 20 } }) =>
      getArticleCommunity({
        category,
        type,
        size: pageParam.size,
        lastId: pageParam.lastId,
      }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: { lastId: undefined, size: 20 },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.data.hasNext || lastPage.data.articles.length === 0) {
        return undefined;
      }
      const lastId = lastPage.data.articles[lastPage.data.articles.length - 1]?.articleId;
      return { lastId: lastId, size: 20 };
    },
  });
};

export const useArticleCommentCommunity = (
  articleId: string,
  selectCommentMenu: 'RECENT' | 'LIKE'
) => {
  return useInfiniteQuery({
    queryKey: ['Article_Comment', articleId],
    queryFn: ({ pageParam = { lastId: undefined, size: 20 } }) =>
      getArticleCommentInformCommunity({
        articleId,
        lastId: pageParam.lastId,
        size: pageParam.size,
        selectCommentMenu,
      }),

    getNextPageParam: (lastPage) => {
      return lastPage?.data.hasNext
        ? { lastId: lastPage.data.comments[lastPage.data.comments.length - 1].commentId, size: 20 }
        : undefined;
    },
    initialPageParam: { lastId: undefined, size: 20 },
  });
};
export const useArticleInformCommunity = ({
  articleId,
  boardInformData,
}: ArticleInformGetCommunityPayload) => {
  return useQuery({
    queryKey: ['Article_Inform'],
    queryFn: () =>
      getArticleInformCommunity({
        articleId,
      }),
    initialData: boardInformData,
  });
};

export const useArticlePostCommunityMutation = () => {
  const queryClient = useQueryClient();
  const articlePostCommunityMutation = useMutation({
    mutationFn: postArticleCommunity,
    onSuccess: () => {
      alert('게시글이 작성되었씁니다 !');
      queryClient.invalidateQueries({ queryKey: ['Article_Result'] });
    },
  });

  return articlePostCommunityMutation;
};

export const useArticleDeleteCommunityMutation = () => {
  const queryClient = useQueryClient();
  const articlePostCommunityMutation = useMutation({
    mutationFn: deleteArticleCommunity,
    onSuccess: () => {
      alert('게시글이 삭제되었습니다 !');
      queryClient.invalidateQueries({ queryKey: ['Article_Result'] });
    },
  });

  return articlePostCommunityMutation;
};

export const useArticlePostLikeCommunityMutation = () => {
  const queryClient = useQueryClient();
  const articlePostLikeCommunityMutation = useMutation({
    mutationFn: postArticleLikeCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Article_Inform'] });
    },
  });

  return articlePostLikeCommunityMutation;
};

export const useArticleCommentPostCommunityMutation = () => {
  const queryClient = useQueryClient();
  const articlePostCommunityMutation = useMutation({
    mutationFn: postArticleCommentCommunity,
    onSuccess: () => {
      alert('게시글 댓글이 작성되었습니다 !');
      queryClient.invalidateQueries({ queryKey: ['Article_Comment'] });
    },
  });

  return articlePostCommunityMutation;
};

export const useArticlePostCommentLikeCommunityMutation = () => {
  const queryClient = useQueryClient();
  const articlePostCommentLikeCommunityMutation = useMutation({
    mutationFn: postArticleCommentLikeCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Article_Comment'] });
      queryClient.invalidateQueries({ queryKey: ['Article_Detail_Comment'] });
    },
  });

  return articlePostCommentLikeCommunityMutation;
};

export const useArticleDeleteCommentCommunityMutation = () => {
  const queryClient = useQueryClient();
  const articleDeleteCommentCommunityMutation = useMutation({
    mutationFn: deleteArticleCommentCommunity,
    onSuccess: () => {
      alert('댓글이 삭제되었습니다 !');
      queryClient.invalidateQueries({ queryKey: ['Article_Comment'] });
    },
  });

  return articleDeleteCommentCommunityMutation;
};
