import clientApi from '@/lib/clientAxios';

export const COMMUNITY = {
  GET_ARTICLE: '/api/v1/article',
  GET_DETAIL_ARTICLE: '/api/v1/article',
  GET_ARTICLE_COMMENT: '/api/v1/article',
  GET_DETAIL_COMMENT: '/api/v1/article/comment',
  POST_ARTICLE: '/api/v1/article',
  DELTE_ARTICLE: '/api/v1/article',
  POST_ARTICLE_LIKE: '/api/v1/article/like',
  POST_ARTICLE_COMMENT: '/api/v1/article/comment',
  POST_ARTICLE_COMMENT_LIKE: '/api/v1/article/comment/like',
  DLETE_ARTICLE_COMMENT: '/api/v1/article/comment',
};

export interface AricleDetailCommentCommunityPayload {
  commentId: number | null;
  lastId?: number;
  size?: number;
}

export const getDetailCommentCommunity = async ({
  commentId,
  size,
  lastId,
}: AricleDetailCommentCommunityPayload) => {
  const params = {
    lastId,
    size,
  };
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_DETAIL_COMMENT}/${commentId}/reply`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export interface AricleCommunityPayload {
  type: 'EXERCISE' | 'INFO_QUESTION';
  category: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW';
  lastId?: number;
  size: number;
}

export const getArticleCommunity = async ({
  type,
  category,
  size,
  lastId,
}: AricleCommunityPayload) => {
  const params = {
    type,
    size,
    category,
    lastId,
  };
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_ARTICLE}`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export interface ArticlePostCommunityPayload {
  title: string;
  content: string;
  articleType: 'EXERCISE' | 'INFO_QUESTION';
  articleCategory:
    | 'ALL'
    | 'FOLLOWING'
    | 'POPULAR'
    | 'INFORMATION'
    | 'FEEDBACK'
    | 'BODY_REVIEW'
    | '';
  visibility: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE';
  image?: File | null;
}

export const postArticleCommunity = async ({
  title,
  content,
  articleType,
  articleCategory,
  visibility,
  image,
}: ArticlePostCommunityPayload) => {
  const formData = new FormData();
  const customArticleRequest = JSON.stringify({
    title,
    content,
    articleType,
    articleCategory,
    visibility,
  });

  formData.append('articleSaveRequest', customArticleRequest);
  if (image) {
    formData.append('file', image);
  }

  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_ARTICLE}`,
      formData
    );
    return res;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

interface ArticleDeleteCommunityPayload {
  articleId: string;
}

export const deleteArticleCommunity = async ({ articleId }: ArticleDeleteCommunityPayload) => {
  try {
    const res = await clientApi.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.DELTE_ARTICLE}/${articleId}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

interface ArticlePostLikeCommunityPayload {
  articleId: string;
}

export const postArticleLikeCommunity = async ({ articleId }: ArticlePostLikeCommunityPayload) => {
  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.POST_ARTICLE_LIKE}`,
      {
        articleId,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

interface ArticlePostCommentLikeCommunityPayload {
  commentId: string;
}

export const postArticleCommentLikeCommunity = async ({
  commentId,
}: ArticlePostCommentLikeCommunityPayload) => {
  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.POST_ARTICLE_COMMENT_LIKE}`,
      {
        commentId,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export interface ArticleInformGetCommunityPayload {
  articleId: string;
  boardInformData?: any;
}

export const getArticleInformCommunity = async ({
  articleId,
}: ArticleInformGetCommunityPayload) => {
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_DETAIL_ARTICLE}/${articleId}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

interface ArticleCommentPostCommunityPayload {
  articleId: string;
  content: string;
  parentId?: string;
  reply: boolean;
  replyNickname?: string;
}

export const postArticleCommentCommunity = async ({
  articleId,
  content,
  parentId,
  replyNickname,
}: ArticleCommentPostCommunityPayload) => {
  const payload = {
    articleId,
    content,
    ...(parentId && { parentId }),
    ...(replyNickname && { replyNickname }),
  };

  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.POST_ARTICLE_COMMENT}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    throw error;
  }
};

export interface ArticleCommentInformGetCommunityPayload {
  articleId: string;
  lastId?: number;
  size: number;
  selectCommentMenu: 'RECENT' | 'LIKE';
}

export const getArticleCommentInformCommunity = async ({
  articleId,
  lastId,
  size,
  selectCommentMenu,
}: ArticleCommentInformGetCommunityPayload) => {
  const params = {
    lastId,
    size,
    sortOrder: selectCommentMenu,
  };
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_ARTICLE_COMMENT}/${articleId}/comment`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

interface ArticleDeleteCommentCommunityPayload {
  commentId: string;
}

export const deleteArticleCommentCommunity = async ({
  commentId,
}: ArticleDeleteCommentCommunityPayload) => {
  try {
    const res = await clientApi.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.DLETE_ARTICLE_COMMENT}/${commentId}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};
