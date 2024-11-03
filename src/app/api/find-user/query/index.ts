import { useQuery } from '@tanstack/react-query';
import { GetFindFollowersPayload, GetFindFollowingPayload, GetFindUserPayload } from '../types';
import { getFindFollowing, getFindUser } from '..';
import { HOUR, TODAY } from '@/lib/GetQueryClient';

export const useGetFindUser = ({ nickname, size, from, session }: GetFindUserPayload) => {
  return useQuery({
    queryKey: ['get_user', nickname],
    queryFn: () => getFindUser({ nickname, size, from, session }),
    enabled: !!session,
    staleTime: HOUR,
    gcTime: TODAY,
    retry: 3,
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
