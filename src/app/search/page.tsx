'use client';

import React, { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import RecentSearch from './components/RecentSearch';
import useHeader from './hooks/useHeader';
import SearchResult from './components/SearchResult';

const Search = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('q') || '';

  const { isFocused, handleChangeFocus, handlePostSearch, handleBack, handleChange, handleFocus } =
    useHeader({
      searchParams,
      search,
    });

  return (
    <div className="flex flex-col bg-backgrounds-default h-screen text-text-main overflow-hidden">
      <div className="flex items-center justify-between h-12 px-5 py-2.5 text-text-main">
        <div onClick={handleBack} className="cursor-pointer">
          <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
        </div>
        <div className="relative flex flex-grow bg-backgrounds-light items-center rounded-6 h-10 my-4">
          <Image
            onClick={handlePostSearch}
            className="absolute left-3 top-2 cursor-pointer"
            src="/assets/search.svg"
            alt="돋보기"
            width={24}
            height={24}
          />
          <Input
            className="w-full pl-10 placeholder:text-base placeholder:text-text-light bg-backgrounds-light text-white rounded-md border border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
            placeholder="검색"
            value={search}
            onChange={handleChange}
            onFocus={handleFocus}
            type="text"
            style={{ boxShadow: 'none' }}
          />
        </div>
      </div>

      {!isFocused ? <SearchResult /> : <RecentSearch handleChangeFocus={handleChangeFocus} />}
    </div>
  );
};

export default function WrappedSearch() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}
