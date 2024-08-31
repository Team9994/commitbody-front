import axios from 'axios';

const EXERCISE = {
  GET_COMMENT: '/api/v1/comment-exercise',
  DELETE_COMMENT: '/api/v1/comment-exercise',
};

interface CommentPayload {
  id: string;
  source: 'custom' | 'default';
  lastId?: number | null;
  size: number;
  session: any;
}

export const getComment = async ({
  session,
  id,
  source = 'default',
  lastId,
  size,
}: CommentPayload) => {
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
