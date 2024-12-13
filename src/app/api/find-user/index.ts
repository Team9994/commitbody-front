import {
  GetFindFollowersData,
  GetFindFollowersPayload,
  GetFindFollowingData,
  GetFindFollowingPayload,
  GetFindUserData,
  GetFindUserPayload,
} from './types';
import { API } from '@/types';
import clientApi from '@/lib/clientAxios';

const FIND_USER = {
  GET_SEARCH_MEMBER: '/api/v1/search/member',
  GET_SEARCH_FOLLOWING: '/api/v1/followings',
  POST_SEARCH_FOLLOWER: '/api/v1/followers',
};

export const getFindUser = async ({
  nickname,
  size,
  from,
}: GetFindUserPayload): Promise<API<GetFindUserData>> => {
  const params = {
    nickname,
    size,
    from,
  };
  try {
    const res = await clientApi.get<API<GetFindUserData>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FIND_USER.GET_SEARCH_MEMBER}`,
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

export const getFindFollowing = async ({
  id,
  lastId,
  nickname,
  size = 50,
}: GetFindFollowingPayload): Promise<API<GetFindFollowingData>> => {
  const params = {
    lastId,
    size,
    nickname,
  };
  try {
    const res = await clientApi.get<API<GetFindFollowingData>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FIND_USER.GET_SEARCH_FOLLOWING}/${id}`,
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

export const getFindFollowers = async ({
  id,
  lastId,
  nickname,
  size = 50,
}: GetFindFollowersPayload): Promise<API<GetFindFollowersData>> => {
  const params = {
    lastId,
    size,
    nickname,
  };
  try {
    const res = await clientApi.get<API<GetFindFollowersData>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${FIND_USER.POST_SEARCH_FOLLOWER}/${id}`,
      {}
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
};
