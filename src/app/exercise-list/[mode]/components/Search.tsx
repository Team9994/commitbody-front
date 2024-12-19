import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

interface SearchProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onChange }: SearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full h-16 bg-backgrounds-default flex items-center mb-2 px-5">
      <div className="relative flex w-full">
        <Input
          placeholder="운동 이름을 검색해보세요"
          className={`flex items-center w-full h-10 text-sm leading-5 py-2.5 rounded-6 bg-backgrounds-light border border-transparent focus:outline-none focus:ring-0 focus:border-transparent transition-all ${
            isFocused ? 'pl-4' : 'pl-10'
          }`}
          style={{ boxShadow: 'none' }}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <Image
          className={`absolute left-2 top-2 transition-opacity duration-300 ${
            isFocused ? 'opacity-0' : 'opacity-100'
          }`}
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
