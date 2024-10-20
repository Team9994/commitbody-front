'use client';

import Back from '@/components/common/Back';
import Header from '@/components/layouts/header';
import { Input } from '@/components/ui/input';
import useInput from '@/hooks/useInput';
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
    </div>
  );
};

export default Search;
