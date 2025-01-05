'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Header from '@/components/layouts/Header';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import SelectToggle from './components/SelectToggle';
import { Follow, getFollower, getFollowing } from '../api/follower';
import { usePostFollowerMutation } from '../api/follower/query';

const Following_Follower = () => {
  const router = useRouter();

  const [menuSelected, setMenuSelected] = useState<'follower' | 'following'>('follower');
  const [findUsertData, setFindUserData] = useState<Follow[] | []>([]);
  const { PostFollowerMutation } = usePostFollowerMutation();
  const { data: session } = useSession();
  const [clickFollow, setClickFollow] = useState(false);

  useEffect(() => {
    if (!session) return;

    if (menuSelected === 'follower') {
      (async () => {
        if (!session) return;
        const res = await getFollower(session?.memberId || '');
        setFindUserData(res.data.follows);
      })();
    }

    if (menuSelected === 'following') {
      (async () => {
        if (!session) return;
        const res = await getFollowing(session?.memberId || '');
        setFindUserData(res.data.follows);
      })();
    }
  }, [session?.memberId, menuSelected, clickFollow]);

  return (
    <div className="flex flex-col bg-backgrounds-default h-screen text-text-main overflow-hidden">
      <Header
        left={
          <div onClick={() => router.back()}>
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        center={
          <h4 className="text-xl font-semibold leading-7 text-text-main">{session?.nickname}</h4>
        }
        right={<div className="opacity-0">무</div>}
        className="relative z-20"
      />
      <SelectToggle selected={menuSelected} setSelected={setMenuSelected} />
      {/* <div className="relative my-4 mx-5 bg-backgrounds-light rounded-6 h-10">
        {!focus && (
          <Image
            onClick={() => handlePostSearch()}
            className="absolute left-3 top-2 cursor-pointer"
            src="/assets/search.svg"
            alt="돋보기"
            width={24}
            height={24}
          />
        )}

        <Input
          className={`${focus ? 'pl-4' : 'pl-10'} cursor-pointer placeholder:text-base placeholder:text-text-light bg-backgrounds-light text-white rounded-md border border-transparent focus:outline-none focus:ring-0 focus:border-transparent transition-all`}
          placeholder="검색"
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="text"
          style={{ boxShadow: 'none' }}
          autoCorrect="off"
          spellCheck="false"
        />
      </div> */}
      {findUsertData?.length === 0 && (
        <div className="text-center text-gray-500 my-20">검색 결과가 없습니다.</div>
      )}
      {findUsertData?.map((user) => (
        <div
          className="flex items-center justify-between px-5 py-3 cursor-pointer"
          key={user.memberId}
        >
          <div>
            <Image
              src={user.profile}
              width={48}
              height={48}
              className="pr-3 rounded-16"
              alt="유저 프로필"
            />
            <p className="text-main font-bold text-md">{user.nickname}</p>
          </div>
          <div
            onClick={() => {
              PostFollowerMutation.mutate({
                followId: user.memberId + '',
                type: user.followStatus ? 'UNFOLLOW' : 'FOLLOW',
              });
              setClickFollow((pre) => !pre);
            }}
            className={`flex justify-center items-center w-[81px] h-7 text-sm rounded-[4px] cursor-pointer ${
              user.followStatus
                ? 'bg-[#D83434] text-[#FFEBEB] border border-[#B22222] font-bold text-xs'
                : 'bg-[#1F3750] text-blue'
            }`}
          >
            {user.followStatus ? '언팔로우' : '팔로우'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Following_Follower;
