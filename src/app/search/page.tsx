'use client';

import Back from '@/components/common/Back';
import Header from '@/components/layouts/header';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('q') || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }
    router.replace(`?${newParams.toString()}`);
  };
  return (
    <div className="flex flex-col bg-backgrounds-default h-screen text-text-main overflow-hidden">
      <Header
        left={<Back />}
        right={
          <div className="relative flex w-full min-w-[276px] bg-backgrounds-light items-center rounded-6 h-10">
            <Image
              className="absolute left-3 top-2"
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
        }
        className="relative z-20"
      />
      <div className="flex w-full justify-between px-5 py-4 text-s border-b-[0.1px] border-text-light">
        <div className="text-text-light">최근 검색어</div>
        <div className="text-text-sub">전체 삭제</div>
      </div>
      <div className="flex w-full justify-between px-5 py-4 text-sm">
        <div className="text-text-main">운동 잘하는 방법</div>
        <Image src="/assets/deleteBtn.svg" width={20} height={20} alt="삭제 버튼" />
      </div>
      <div className="flex w-full justify-between px-5 py-4 text-sm">
        <div className="text-text-main">운동 잘하는 방법</div>
        <Image src="/assets/deleteBtn.svg" width={20} height={20} alt="삭제 버튼" />
      </div>
    </div>
  );
};

export default Search;
