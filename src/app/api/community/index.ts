import axios from 'axios';

const COMMUNITY = {
  GET_ARTICLE: '/api/v1/article',
  POST_ARTICLE: '/api/v1/article',
};

export interface AricleCommunityPayload {
  type: 'EXERCISE' | 'INFO_QUESTION';
  category: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW';
  lastId?: number;
  size: number;
  session: any;
}

export const getArticleCommunity = async ({
  type,
  category,
  size,
  lastId,
  session,
}: AricleCommunityPayload) => {
  const params = {
    type,
    size,
    category,
    lastId,
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_ARTICLE}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        params,
      }
    );
    console.log(res);
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
  articleCategory: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW';
  visibility: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE';
  session: any;
  image?: File | null;
}

export const postArticleCommunity = async ({
  title,
  content,
  articleType,
  articleCategory,
  visibility,
  image,
  session,
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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_ARTICLE}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};
