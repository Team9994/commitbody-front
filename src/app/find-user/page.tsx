'use client';
import Header from '@/components/layouts/header';
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useGetFindUser } from '../api/find-user/query';
import { useSession } from 'next-auth/react';
import debounce from 'lodash/debounce';

const FindUser = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialSearch);
  const { data: findUserData, refetch: findUserRefetch } = useGetFindUser({
    nickname: search,
    size: '50',
    session,
  });

  const handlePostSearch = () => {
    if (!search) {
      alert('검색어를 입력해주세요!');
      return;
    }
    findUserRefetch();
  };
  console.log(findUserData);

  const debouncedUpdateQuery = useCallback(
    debounce((value) => {
      const newParams = new URLSearchParams(searchParams);
      if (value) {
        newParams.set('q', value);
      } else {
        newParams.delete('q');
      }
      router.replace(`?${newParams.toString()}`);
    }, 500),
    [searchParams, router]
  );

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedUpdateQuery(value);
  }, 500);

  return (
    <div className="flex flex-col bg-backgrounds-default h-screen text-text-main overflow-hidden">
      <Header
        left={
          <div onClick={() => router.back()}>
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        center={<h4 className="text-xl font-semibold leading-7 text-text-main">회원 찾기</h4>}
        right={<div className="opacity-0">무</div>}
        className="relative z-20"
      />
      <div className="relative my-4 mx-5 bg-backgrounds-light rounded-6 h-10">
        <Image
          onClick={() => handlePostSearch()}
          className="absolute left-3 top-2 cursor-pointer"
          src="/assets/search.svg"
          alt="돋보기"
          width={24}
          height={24}
        />
        <Input
          className="pl-10 placeholder:text-base placeholder:text-text-light bg-backgrounds-light text-white rounded-md border border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder="검색"
          onChange={handleChange}
          type="text"
          style={{ boxShadow: 'none' }}
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      {findUserData?.data?.members?.length === 0 && (
        <div className="text-center text-gray-500 my-20">검색 결과가 없습니다.</div>
      )}
      {findUserData?.data?.members?.map((user) => (
        <div className="flex items-center px-5 py-3" key={user.memberId}>
          <Image
            src={user.profile}
            width={48}
            height={48}
            className="pr-3 rounded-16"
            alt="유저 프로필"
          />
          <p className="text-main font-bold text-md">{user.nickname}</p>
        </div>
      ))}
    </div>
  );
};

export default FindUser;
