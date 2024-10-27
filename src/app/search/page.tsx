'use client';

import Header from '@/components/layouts/header';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';
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
      <Header
        left={
          <Image
            onClick={() => handleBack()}
            priority
            src={'/assets/back.svg'}
            alt={'뒤로가기'}
            width={24}
            height={24}
          />
        }
        right={
          <div className="relative flex w-full min-w-[276px] bg-backgrounds-light items-center rounded-6 h-10">
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
              onFocus={handleFocus}
              type="text"
              style={{ boxShadow: 'none' }}
            />
          </div>
        }
        className="relative z-20"
      />
      {!isFocused && <SearchResult />}
      {isFocused && <RecentSearch handleChangeFocus={handleChangeFocus} />}
    </div>
  );
};

export default Search;
