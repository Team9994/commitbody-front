import React from 'react';
import Image from 'next/image';
import useRecentSearch from '../hooks/useRecentSearch';

const RecentSearch = () => {
  const { data, deleteSearchMutation, handleDeleteAllSearchRecords, session } = useRecentSearch();

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
          <div key={item} className="flex w-full justify-between px-5 py-4 text-sm overflow-scroll">
            <div className="text-text-main">{item}</div>
            <Image
              src="/assets/deleteBtn.svg"
              width={20}
              height={20}
              alt="삭제 버튼"
              className="cursor-pointer"
              onClick={() => deleteSearchMutation.mutate({ title: item, session })}
            />
          </div>
        ))
      )}
    </>
  );
};

export default RecentSearch;
