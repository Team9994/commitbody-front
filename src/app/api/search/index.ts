import { API } from '@/types';
import { ArticleData } from './types';
import clientApi from '@/lib/clientAxios';

const SEARCH = {
  GET_SEARCH_RECORD: '/api/v1/article/search-record',
  GET_SEARCH_ARTICLE: '/api/v1/article/search',
  POST_SEARCH_RECORD: '/api/v1/article/search-record',
  DELETE_SEARCH_RECORD: '/api/v1/article/search-record',
};

export interface SearchListsPayload {
  title: string;
  category: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW';
  lastId?: number | null;
  size?: number;
}

export const getArticleSearchResult = async ({
  title,
  category,
  size,
  lastId,
}: SearchListsPayload): Promise<API<ArticleData>> => {
  const params = {
    title,
    size,
    category,
    lastId,
  };

  try {
    const res = await clientApi.get<API<ArticleData>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${SEARCH.GET_SEARCH_ARTICLE}`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

export const postSearchRecord = async ({ title }: { title: string }): Promise<API<null>> => {
  const res = await clientApi.post<API<null>>(
    `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${SEARCH.POST_SEARCH_RECORD}`,
    { title }
  );

  return res.data;
};

export const getSearchRecord = async (): Promise<API<string[]>> => {
  const res = await clientApi.get<API<string[]>>(
    `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${SEARCH.GET_SEARCH_RECORD}`
  );

  return res.data;
};

export const deleteSearchRecord = async ({
  title,
  type,
}: {
  title?: string;
  type?: string;
}): Promise<API<null>> => {
  const params = {
    title,
    type,
  };

  const res = await clientApi.delete<API<null>>(
    `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${SEARCH.DELETE_SEARCH_RECORD}`,
    {
      params,
    }
  );

  return res.data;
};
