import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';
import useExplain from '../hooks/useExplain';

const Comment = () => {
  const { handleMenuClick, activeMenuId, menuRef } = useExplain();

  return (
    <>
      <h3 className="font-lg font-bold leading-[26px] text-text-main mb-2">댓글</h3>
      <div className="relative mb-6">
        <Input
          style={{ boxShadow: 'none' }}
          className="w-full h-[40px] bg-backgrounds-light focus:outline-none border-none placeholder-[#999999]"
          placeholder="댓글을 작성해보세요"
        />
        <Image
          src={'/assets/send.svg'}
          alt="보내기"
          width={18}
          height={18}
          className="absolute top-1/2 right-[13px] -translate-y-[9px]"
        />
      </div>
      {COMMENT.map((data) => {
        return (
          <section key={data.id} className="flex relative w-[320px] mb-7">
            <div className="bg-backgrounds-sub w-6 h-6 rounded-full" />
            <div className="ml-2">
              <div className="text-xs mb-2">
                <span className="mr-2 text-text-sub">{data.name}</span>
                <span className="text-[#999999]">5분 전</span>
              </div>
              <p className="text-s font-medium text-text-main leading-[18px] mb-1">
                {data.content}
              </p>
              <div className="flex items-center">
                <Image
                  className="mr-1"
                  src="/assets/recommend.svg"
                  width={24}
                  height={24}
                  alt="추천"
                />
                <p>{data.like}</p>
              </div>
            </div>
            <Image
              className="absolute top-0 right-0 cursor-pointer"
              src="/assets/menu.svg"
              width={18}
              height={18}
              alt="menu"
              onClick={() => handleMenuClick(data.id)}
            />

            {activeMenuId === data.id && (
              <div
                ref={menuRef}
                className="absolute top-0 z-10 right-0 shadow-main bg-backgrounds-light text-md"
              >
                <div className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub">
                  수정
                </div>
                <div className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer">삭제</div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};

export default Comment;

const COMMENT = [
  {
    id: 1,
    name: '운동 입문자',
    content: '이 운동은 복합적인 근육을 동시에 자극해서 전신 근육~~',
    like: 0,
    source: 'custom',
  },
  {
    id: 2,
    name: '운동 중급자',
    content: '이 운동은 복합적인 근육을 동시에 자극해서 전신 근육~~',
    like: 0,
    source: 'default',
  },
];
