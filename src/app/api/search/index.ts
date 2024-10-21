import { API } from '@/types';
import axios from 'axios';

const SEARCH = {
  POST_SEARCH_RECORD: '/api/v1/article/search-record',
  GET_SEARCH_RECORD: '/api/v1/article/search-record',
  DELETE_SEARCH_RECORD: '/api/v1/article/search-record',
};

export const postSearchRecord = async ({
  title,
  session,
}: {
  title: string;
  session: any;
}): Promise<API<null>> => {
  const res = await axios.post<API<null>>(
    `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${SEARCH.POST_SEARCH_RECORD}`,
    { title },
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  console.log(res.data);
  return res.data;
};

export const getSearchRecord = async ({ session }: { session: any }): Promise<API<string[]>> => {
  const res = await axios.get<API<string[]>>(
    `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${SEARCH.GET_SEARCH_RECORD}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  console.log(res.data);
  return res.data;
};

export const deleteSearchRecord = async ({
  title,
  type,
  session,
}: {
  title?: string;
  type?: string;
  session: any;
}): Promise<API<null>> => {
  const params = {
    title,
    type,
  };

  const res = await axios.delete<API<null>>(
    `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${SEARCH.DELETE_SEARCH_RECORD}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      params,
    }
  );

  console.log(res.data);
  return res.data;
};
