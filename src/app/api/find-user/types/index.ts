// 사용자 검색 API
export interface GetFindUserPayload {
  nickname: string;
  size?: string;
  from?: string;
  enabled?: boolean;
}

interface Members {
  memberId: number;
  nickname: string;
  profile: string;
}

export interface GetFindUserData {
  totalCount: number;
  members: Members[];
}

// 팔로잉 목록 API
export interface GetFindFollowingPayload {
  id: number;
  lastId: number;
  size: number;
  nickname: string;
}

interface Follows {
  followId: number;
  memberId: number;
  nickname: string;
  profile: string;
  isCurrentUser: boolean;
}
export interface GetFindFollowingData {
  hasNext: boolean;
  follows: Follows;
}

// 팔로워 목록 API
export interface GetFindFollowersPayload {
  id: number;
  lastId: number;
  size: number;
  nickname: string;
}

interface Followers {
  followId: number;
  memberId: number;
  nickname: string;
  profile: string;
  isCurrentUser: boolean;
}
export interface GetFindFollowersData {
  hasNext: boolean;
  follows: Followers;
}
