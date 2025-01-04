import clientApi from '@/lib/clientAxios';

const FOLLOWER = {
  POST_FOLLOW: '/api/v1/follow',
  GET_FOLLOWERS: (id: string) => `/api/v1/followers/${id}`,
  GET_FOLLOWINGS: (id: string) => `/api/v1/followings/${id}`,
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

export interface Follow {
  followId: number; // Unique identifier for the follow relationship
  memberId: number; // Unique identifier for the member
  nickname: string; // Nickname of the member
  profile: string; // Profile URL
  isCurrentUser?: boolean; // Optional: Whether this follow belongs to the current user
  followStatus?: boolean; // Optional: Follow status (e.g., following or not)
}

export const getFollower = async (id: string) => {
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FOLLOWER.GET_FOLLOWERS(id)}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch followers:', error);
    throw error;
  }
};

export const getFollowing = async (id: string) => {
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FOLLOWER.GET_FOLLOWINGS(id)}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch followings:', error);
    throw error;
  }
};
