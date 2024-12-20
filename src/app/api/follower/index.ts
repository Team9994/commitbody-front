import clientApi from '@/lib/clientAxios';

const FOLLOWER = {
  POST_FOLLOW: '/api/v1/follow',
};

export const postFollower = async ({
  followId,
  type,
}: {
  followId: string;
  type: 'FOLLOW' | 'UNFOLLOW';
}) => {
  const body = {
    followId,
    type,
  };
  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FOLLOWER.POST_FOLLOW}`,
      body
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};
