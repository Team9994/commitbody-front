import axios from 'axios';
import {
  GetFindFollowersData,
  GetFindFollowersPayload,
  GetFindFollowingData,
  GetFindFollowingPayload,
  GetFindUserData,
  GetFindUserPayload,
} from './types';
import { API } from '@/types';

const FIND_USER = {
  GET_SEARCH_MEMBER: '/api/v1/search/member',
  GET_SEARCH_FOLLOWING: '/api/v1/followings',
  POST_SEARCH_FOLLOWER: '/api/v1/followers',
};

export const getFindUser = async ({
  nickname,
  size,
  from,
  session,
}: GetFindUserPayload): Promise<API<GetFindUserData>> => {
  const params = {
    nickname,
    size,
    from,
  };
  try {
    const res = await axios.get<API<GetFindUserData>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FIND_USER.GET_SEARCH_MEMBER}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

export const getFindFollowing = async ({
  id,
  lastId,
  nickname,
  size = 50,
  session,
}: GetFindFollowingPayload): Promise<API<GetFindFollowingData>> => {
  const params = {
    lastId,
    size,
    nickname,
  };
  try {
    const res = await axios.get<API<GetFindFollowingData>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FIND_USER.GET_SEARCH_FOLLOWING}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};

export const getFindFollowers = async ({
  id,
  lastId,
  nickname,
  size = 50,
  session,
}: GetFindFollowersPayload): Promise<API<GetFindFollowersData>> => {
  const params = {
    lastId,
    size,
    nickname,
  };
  try {
    const res = await axios.get<API<GetFindFollowersData>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FIND_USER.POST_SEARCH_FOLLOWER}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};
