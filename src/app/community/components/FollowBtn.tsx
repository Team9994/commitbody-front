'use client';
import { usePostFollowerMutation } from '@/app/api/follower/query';
import React, { useState } from 'react';

interface FollowBtnProps {
  data: any;
}

const FollowBtn = ({ data }: FollowBtnProps) => {
  const status = data.data.followStatus === 'FOLLOWING' ? true : false;
  const [followBtnStatus, setFollowBtnStatus] = useState(status);
  const { PostFollowerMutation } = usePostFollowerMutation();

  return (
    <div
      onClick={() => {
        PostFollowerMutation.mutate({
          followId: data.data.member.memberId,
          type: followBtnStatus ? 'UNFOLLOW' : 'FOLLOW',
        });
        setFollowBtnStatus((pre: boolean) => !pre);
      }}
      className={`flex justify-center items-center w-[81px] h-7 text-sm rounded-[4px] cursor-pointer ${
        followBtnStatus
          ? 'bg-[#D83434] text-[#FFEBEB] border border-[#B22222] font-bold text-xs'
          : 'bg-[#1F3750] text-blue'
      }`}
    >
      {followBtnStatus ? '언팔로우' : '팔로우'}
    </div>
  );
};

export default FollowBtn;
