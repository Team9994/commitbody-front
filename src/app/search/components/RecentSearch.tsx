'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import useRecentSearch from '../hooks/useRecentSearch';

interface RecentSearchProps {
  handleChangeFocus: () => void;
}

const RecentSearch = ({ handleChangeFocus }: RecentSearchProps) => {
  const router = useRouter();
  const { data, deleteSearchMutation, handleDeleteAllSearchRecords, session } = useRecentSearch();

  const handleSearchClick = (item: string) => {
    handleChangeFocus();
    router.push(`/search?q=${item}`);
  };

  return (
    <>
      <div className="flex w-full justify-between px-5 py-4 text-s border-b-[0.1px] border-text-light">
        <div className="text-text-light">최근 검색어</div>
        <div className="text-text-sub cursor-pointer" onClick={handleDeleteAllSearchRecords}>
          전체 삭제
        </div>
      </div>
      {data?.data?.length === 0 ? (
        <div className="text-center mt-5 text-s">최근 검색어가 없습니다.</div>
      ) : (
        data?.data?.map((item) => (
          <div
            key={item}
            className="flex w-full justify-between px-5 py-4 text-sm overflow-scroll"
            onClick={() => handleSearchClick(item)}
          >
            <div className="text-text-main cursor-pointer">{item}</div>
            <Image
              src="/assets/deleteBtn.svg"
              width={20}
              height={20}
              alt="삭제 버튼"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleteSearchMutation.mutate({ title: item, session });
              }}
            />
          </div>
        ))
      )}
    </>
  );
};

export default RecentSearch;
