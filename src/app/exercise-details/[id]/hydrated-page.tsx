'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import useExplain from '../hooks/useExplain';

const ExerciseDetails = () => {
  const [selected, setSelected] = useState('explain');

  const { activeMenuId, handleMenuClick, menuRef } = useExplain();

  return (
    <div>
      <div className="mx-auto px-5">
        <h3 className="font-bold text-lg leading-[26px] text-text-main mb-1 mt-3">
          덤벨 라잉 외회전 숄더 로테이션
        </h3>
        <p className="text-sm leading-5 text-text-light mb-4">가슴 : 스미스머신</p>
        <div className="w-full h-[184px] bg-backgrounds-light mb-4"></div>
      </div>

      <div className="flex w-full text-base text-center">
        <div
          className={`flex-grow cursor-pointer py-3 ${
            selected === 'explain'
              ? 'text-[#EDEDED] font-bold border-b-2 border-[#EDEDED]'
              : 'text-[#555555] border-b-2 border-[#555555]'
          }`}
          onClick={() => setSelected('explain')}
        >
          설명
        </div>
        <div
          className={`flex-grow cursor-pointer py-3 ${
            selected === 'record'
              ? 'text-[#EDEDED] font-bold border-b-2 border-[#EDEDED]'
              : 'text-[#555555] border-b-2 border-[#555555]'
          }`}
          onClick={() => setSelected('record')}
        >
          기록/분석
        </div>
      </div>
      <div className="w-full px-5 mt-4">
        <h4 className="text-lg text-text-main font-bold mb-2">운동 순서</h4>
        <p className="mb-2">1. 등을 대고 눕고 무릎을 구부리며 발은 바닥에 평평하게 붙입니다.</p>
        <p className="mb-2">2. 운동 순서 두번째 입니다. instructions/step_1</p>
        <p className="mb-2">3. 운동 순서 첫번째 입니다. instructions/step_2</p>

        <div className="w-[320px] h-[40px] rounded-6 border border-backgrounds-light text-s flex justify-between items-center px-4 mb-10 mt-5">
          <div className="leading-[18px] text-text-main ">더 자세한 동작을 알고싶다면?</div>
          <div className="leading-[18px] text-blue">동영상 보러 가기 </div>
        </div>
        <h3 className="font-lg font-bold leading-[26px] text-text-main mb-2">댓글</h3>
        <div className="relative mb-6">
          <Input
            style={{ boxShadow: 'none' }}
            className="w-[320px] h-[40px] bg-backgrounds-light focus:outline-none border-none placeholder-[#999999]"
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
            <section key={data.id} className="flex relative w-[320px] h-[72px] mb-7">
              <div className="bg-backgrounds-sub w-6 h-6 rounded-full" />
              <div>
                <div className="text-xs mb-2">
                  <span className="mr-2 text-text-sub">운동 입문자</span>
                  <span className="text-[#999999]">5분 전</span>
                </div>
                <p className="text-s font-medium text-text-main leading-[18px] mb-1">
                  이 운동은 복합적인 근육을 동시에 자극해서 전신 근육~~
                </p>
                <div className="flex">
                  <Image
                    className="mr-1"
                    src="/assets/recommend.svg"
                    width={24}
                    height={24}
                    alt="추천"
                  />
                  <p>0</p>
                </div>
              </div>
              <Image
                className="absolute top-0 right-0"
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
      </div>
    </div>
  );
};

export default ExerciseDetails;

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
