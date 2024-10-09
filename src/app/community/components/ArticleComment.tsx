'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState } from 'react';

const ArticleComment = () => {
  const [selectCommentMenu, setSelectCommentMenu] = useState<'RECENT' | 'LIKE'>('RECENT');
  return (
    <div className="pb-40">
      <div className="flex justify-between py-3 px-5 text-md font-bold">
        <div>댓글 3개</div>
        <div className="flex">
          <div
            className={`mr-4 ${selectCommentMenu !== 'RECENT' && 'text-[#777777]'}`}
            onClick={() => setSelectCommentMenu('RECENT')}
          >
            등록순
          </div>
          <div
            className={`${selectCommentMenu !== 'LIKE' && 'text-[#777777]'}`}
            onClick={() => setSelectCommentMenu('LIKE')}
          >
            인기순
          </div>
        </div>
      </div>
      <div className="relative flex px-5 py-3 text-xs">
        <div className="w-6 h-6 bg-[#4D4E52] rounded-lg mr-2" />
        <div className="flex flex-col">
          <div>
            <span className="text-text-sub mr-2">운동 입문자</span>
            <span className="text-text-light">5분 전</span>
          </div>
          <span className="my-2">이 운동은 복합적인 근육을 동시에 자극해서 전신 근육~~</span>
          <div className="flex items-center text-text-sub">
            <div className="flex items-center mr-5 ">
              <Image src="/assets/recommend.svg" alt="추천" width={24} height={24} />
              <span>1</span>
            </div>
            <span>답글 달기</span>
          </div>
          <p className="mt-2 font-bold text-sm text-[#198DF7]">답글 1개 보기</p>
        </div>
        <Image
          src="/assets/menu.svg"
          alt="메뉴"
          width={24}
          height={24}
          className="absolute top-3 right-5"
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 px-5 py-3">
        <div className="bg-backgrounds-light rounded-6 relative">
          <Input
            placeholder="댓글을 작성해보세요"
            className="h-10 bg-backgrounds-light placeholder-text-light focus:outline-none focus:ring-0 focus:shadow-none border-none"
            style={{ boxShadow: 'none' }}
          />
          <Image
            src="/assets/send.svg"
            alt="보내기 버튼"
            width={20}
            height={20}
            className="absolute top-5 right-2 translate-y-[-50%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleComment;
