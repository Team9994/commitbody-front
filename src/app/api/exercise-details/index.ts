import { API } from '@/types';
import axios from 'axios';
import { GetCommentPayload, GetDetailsInfoType } from './type';

const EXERCISE = {
  GET_COMMENT: '/api/v1/comment-exercise',
  POST_COMMENT: '/api/v1/comment-exercise',
  POST_COMMENT_LIKE: '/api/v1/comment-exercise/like',
  PUT_COMMENT: '/api/v1/comment-exercise',
  DELETE_COMMENT: '/api/v1/comment-exercise',
  GET_DETAILS_INFO: '/api/v1/exercise',
};

export const getComment = async ({
  session,
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
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_COMMENT}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
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
  session: any;
  source?: 'default' | 'custom';
  content: string;
}

export const postComment = async ({
  session,
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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_COMMENT}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('Error post comment:', error);
  }
};

interface PutCommentPayload {
  exerciseCommentId: string | null;
  content: string;
  session: any;
}

export const putComment = async ({ exerciseCommentId, content, session }: PutCommentPayload) => {
  const body = {
    exerciseCommentId,
    content,
  };
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.PUT_COMMENT}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('Error put comment:', error);
  }
};

interface DeleteCommentPayload {
  exerciseId: number;
  session: any;
}

export const deleteComment = async ({ exerciseId, session }: DeleteCommentPayload) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.DELETE_COMMENT}/${exerciseId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('Error deleting comment:', error);
  }
};

interface PostCommentLikePayload {
  exCommentId: number;
  session: any;
}

export const postCommentLike = async ({ session, exCommentId }: PostCommentLikePayload) => {
  const body = {
    exCommentId,
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.POST_COMMENT_LIKE}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('Error postLike:', error);
  }
};

export interface GetDetailsInfoPayload {
  id: string;
  source: 'default' | 'custom';
  session: any;
}

export const getDetailsInfo = async ({
  id,
  session,
  source,
}: GetDetailsInfoPayload): Promise<API<GetDetailsInfoType>> => {
  try {
    const res = await axios.get<API<GetDetailsInfoType>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${EXERCISE.GET_DETAILS_INFO}/${id}?source=${source}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error postLike:', error);
    throw error;
  }
};
