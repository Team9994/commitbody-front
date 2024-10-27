'use client';
import Header from '@/components/layouts/header';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import SelectToggle from './components/SelectToggle';
import { Input } from '@/components/ui/input';
import { useGetFindUser } from '../api/find-user/query';
import { useSession } from 'next-auth/react';

const FindUser = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [menuSelected, setMenuSelected] = useState<'search' | 'follower' | 'following'>('search');
  console.log(session);
  const [userId, setUserId] = useState('');
  const searchParams = useSearchParams();
  const search = searchParams.get('q') || '';
  const { data: findUserData, refetch: findUserRefetch } = useGetFindUser({
    nickname: search,
    size: '50',
    session,
  });
  // const { data: followingData, refetch: followingRefetch } = useGetFindFollowing({
  //   nickname: search,
  //   size: '50',
  //   session,
  // });
  // const { data: follwersData, refetch: follwersRefetch } = useGetFindFollowers({
  //   nickname: search,
  //   size: '50',
  //   session,
  // });

  const handlePostSearch = () => {
    if (!search) {
      alert('검색어를 입력해주세요!');
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }
    router.replace(`?${newParams.toString()}`);

    if (menuSelected === 'follower') {
    } else if (menuSelected === 'following') {
    } else {
    }
  };

  return (
    <div className="flex flex-col bg-backgrounds-default h-screen text-text-main overflow-hidden">
      <Header
        left={
          <div
            onClick={() => {
              router.back();
            }}
          >
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        center={<h4 className="text-xl font-semibold leading-7 text-text-main">회원 찾기</h4>}
        right={<div className="opacity-0">무</div>}
        className="relative z-20"
      />
      <SelectToggle selected={menuSelected} setSelected={setMenuSelected} />
      <div className="relative flex my-4 w-[90%] mx-auto  min-w-[276px] bg-backgrounds-light items-center rounded-6 h-10">
        <Image
          onClick={handlePostSearch}
          className="absolute left-3 top-2 cursor-pointer"
          src="/assets/search.svg"
          alt="돋보기"
          width={24}
          height={24}
        />
        <Input
          className="pl-10 placeholder:text-base placeholder:text-text-light bg-backgrounds-light text-white rounded-md border border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder="검색"
          value={search}
          onChange={handleChange}
          type="text"
          style={{ boxShadow: 'none' }}
        />
      </div>
    </div>
  );
};

export default FindUser;
