import { API } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetFindFollowersPayload, GetFindFollowingPayload, GetFindUserPayload } from '../types';
import { getFindFollowing, getFindUser } from '..';

export const useGetFindUser = ({ nickname, size, from, session }: GetFindUserPayload) => {
  return useQuery({
    queryKey: ['get_user'],
    queryFn: () => getFindUser({ nickname, size, from, session }),
    enabled: false,
  });
};

export const useGetFindFollowing = ({
  id,
  lastId,
  nickname,
  size = 50,
  session,
}: GetFindFollowingPayload) => {
  return useQuery({
    queryKey: ['get_following'],
    queryFn: () => getFindFollowing({ id, lastId, nickname, size, session }),
    enabled: false,
  });
};

export const useGetFindFollowers = ({
  id,
  lastId,
  nickname,
  size = 50,
  session,
}: GetFindFollowersPayload) => {
  return useQuery({
    queryKey: ['get_followers'],
    queryFn: () => getFindFollowing({ id, lastId, nickname, size, session }),
    enabled: false,
  });
};
