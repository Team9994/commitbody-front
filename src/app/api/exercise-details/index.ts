import { API } from '@/types';
import { GetCommentPayload, GetDetailsInfoType } from './type';
import clientApi from '@/lib/clientAxios';
import { api } from '@/lib/axios';

const EXERCISE = {
  GET_COMMENT: '/api/v1/comment-exercise',
  POST_COMMENT: '/api/v1/comment-exercise',
  POST_COMMENT_LIKE: '/api/v1/comment-exercise/like',
  PUT_COMMENT: '/api/v1/comment-exercise',
  DELETE_COMMENT: '/api/v1/comment-exercise',
  GET_DETAILS_INFO: '/api/v1/exercise',
};

export const getComment = async ({ id, source = 'default', lastId, size }: GetCommentPayload) => {
  const params = {
    source,
    lastId,
    size,
  };
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_COMMENT}/${id}`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getServerComment = async ({
  id,
  source = 'default',
  lastId,
  size,
}: GetCommentPayload) => {
  const params = {
    source,
    lastId,
    size,
  };
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_COMMENT}/${id}`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

interface PostCommentPayload {
  exerciseId: string;
  source?: 'default' | 'custom';
  content: string;
}

export const postComment = async ({
  exerciseId,
  source = 'default',
  content,
}: PostCommentPayload) => {
  const body = {
    exerciseId,
    source,
    content,
  };
  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_COMMENT}`,
      body
    );
    return res.data;
  } catch (error) {
    console.log('Error post comment:', error);
  }
};

interface PutCommentPayload {
  exerciseCommentId: string | null;
  content: string;
}

export const putComment = async ({ exerciseCommentId, content }: PutCommentPayload) => {
  const body = {
    exerciseCommentId,
    content,
  };
  try {
    const res = await clientApi.put(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.PUT_COMMENT}`,
      body
    );
    return res.data;
  } catch (error) {
    console.log('Error put comment:', error);
  }
};

interface DeleteCommentPayload {
  exerciseId: number;
}

export const deleteComment = async ({ exerciseId }: DeleteCommentPayload) => {
  try {
    const res = await clientApi.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.DELETE_COMMENT}/${exerciseId}`
    );
    return res.data;
  } catch (error) {
    console.log('Error deleting comment:', error);
  }
};

interface PostCommentLikePayload {
  exCommentId: number;
}

export const postCommentLike = async ({ exCommentId }: PostCommentLikePayload) => {
  const body = {
    exCommentId,
  };
  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_COMMENT_LIKE}`,
      body
    );
    return res.data;
  } catch (error) {
    console.log('Error postLike:', error);
  }
};

export interface GetDetailsInfoPayload {
  id: string;
  source: 'default' | 'custom';
}

export const getDetailsInfo = async ({
  id,
  source,
}: GetDetailsInfoPayload): Promise<API<GetDetailsInfoType>> => {
  try {
    const res = await clientApi.get<API<GetDetailsInfoType>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_DETAILS_INFO}/${id}?source=${source}`
    );
    return res.data;
  } catch (error) {
    console.error('Error postLike:', error);
    throw error;
  }
};

export const getServerDetailsInfo = async ({
  id,
  source,
}: GetDetailsInfoPayload): Promise<API<GetDetailsInfoType>> => {
  try {
    const res = await clientApi.get<API<GetDetailsInfoType>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_DETAILS_INFO}/${id}?source=${source}`
    );
    return res.data;
  } catch (error) {
    console.error('Error postLike:', error);
    throw error;
  }
};
