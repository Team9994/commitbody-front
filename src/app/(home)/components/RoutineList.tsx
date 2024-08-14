'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import useRoutine from '../hooks/useRoutine';

const RoutineList = () => {
  const { menuRef, setRoutineToDelete, activeMenuId, handleMenuClick, confirmDelete } =
    useRoutine();

  return (
    <div>
      {RoutineData?.map((data) => (
        <div
          className="bg-[#292C33] rounded-[6px] h-[76px] box-border mb-3 mx-5 p-4 text-[#EDEDED] relative"
          key={data.id}
        >
          <p className="text-[15px] leading-[22px]">{data.title}</p>

          {data.parts.map((part) => (
            <span className="text-[12px] leading-[18px] text-[#999999] mr-[6px]" key={part}>
              {part}
            </span>
          ))}
          <Image
            onClick={() => handleMenuClick(data.id)}
            src={'/assets/menu.svg'}
            alt="메뉴"
            width={24}
            height={24}
            className="absolute top-1/2 right-[20px] transform -translate-y-1/2 rotate-90 cursor-pointer"
          />
          {activeMenuId === data.id && (
            <div
              ref={menuRef}
              className="absolute top-[calc(50%-12px)] z-10 right-[20px] bg-[#3A3E47] text-[15px]"
            >
              <div className="w-[152px] h-[46px] text-[#EDEDED] p-3 cursor-pointer">편집</div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className="w-[152px] h-[46px] text-[#EB4141] p-3 cursor-pointer"
                    onClick={() => setRoutineToDelete(data.id)}
                  >
                    삭제
                  </div>
                </AlertDialogTrigger>
                <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
                <AlertDialogContent className="w-[296px] h-[148px] bg-[#292C33] rounded-[6px] p-0 flex flex-col items-center text-[#EDEDED] border-none">
                  <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-[18px] py-[19px] pb-[11px] font-semibold leading-[26px]">
                      루틴 삭제
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-[14px] font-normal leading-[20px] text-[#EDEDED]">
                      해당 루틴을 삭제할까요?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center h-[48px]">
                    <AlertDialogCancel
                      className="w-[148px] h-full m-0 p-0 text-[15px] font-medium bg-transparent leading-[22px] text-[#999999] text-center cursor-pointer border-none
              focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                      onClick={() => setRoutineToDelete(undefined)}
                    >
                      취소
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-[148px] h-full m-0 p-0 text-[15px] font-medium bg-transparent leading-[22px] text-[#EB4141] text-center cursor-pointer border-none
              focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                      onClick={confirmDelete}
                    >
                      삭제
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      ))}
      {RoutineData.length === 0 && (
        <div className="flex items-center bg-[#292C33] rounded-[6px] h-[76px] box-border mb-3 mx-5 p-4 text-[#EDEDED] relative border-[1px] border-dashed border-[#555555]">
          <p className="text-[15px] leading-[22px] text-[#999999]">새로운 루틴을 추가해보세요</p>

          <Image
            src={'/assets/plus.svg'}
            alt="추가하기"
            width={14}
            height={14}
            className="absolute top-1/2 right-[20px] transform -translate-y-1/2 rotate-90"
          />
        </div>
      )}
    </div>
  );
};

export default RoutineList;

const RoutineData = [
  {
    id: 1,
    title: '무분할 상체 루틴',
    parts: ['가슴', '등', '어깨', '삼두'],
  },
  {
    id: 2,
    title: '하체 루틴',
    parts: ['햄스트링', '대퇴사부'],
  },
  {
    id: 3,
    title: '유산소 루틴',
    parts: ['종아리', '복부'],
  },
];
