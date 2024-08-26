import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

interface SearchProps {
  searchData: string;
}

const Search = ({ searchData }: SearchProps) => {
  return (
    <div className="w-full h-16 bg-backgrounds-default flex items-center mb-2 px-5">
      <div className="relative flex w-full">
        <Input
          placeholder="운동 이름을 검색해보세요"
          className="pl-10 flex items-center w-full h-10 text-sm leading-5 py-2.5 rounded-6 bg-backgrounds-light border border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
          style={{ boxShadow: 'none' }}
        />

        <Image
          className="absolute left-2 top-2"
          src={'/assets/search.svg'}
          width={24}
          height={24}
          alt="돋보기"
        />
      </div>
    </div>
  );
};

export default Search;
