'use client';
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar'; // Make sure the path to your Calendar component is correct
import { DayClickEventHandler } from 'react-day-picker';
import Image from 'next/image';
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
import useMenu from './hooks/useMenu';
import { useRecord } from '../api/record/query';
import { useSession } from 'next-auth/react';

const Record = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const handleDayClick: DayClickEventHandler = (day, { selected }) => {
    setSelected(selected ? undefined : day);
  };
  const { activeMenuId, handleMenuClick, confirmDelete, menuRef, setRecordToDelete } = useMenu();
  const { data: session } = useSession();
  const { data, error, isLoading } = useRecord({ year: '2024', month: '9', session });
  return (
    <div className="w-full min-h-screen px-3 bg-backgrounds-default text-white flex flex-col items-center pb-[58px]">
      <Calendar mode="single" selected={selected} onSelect={setSelected} className="mt-3 mb-6" />

      {data.data.records.map((data: any) => (
        <div
          key={data.recordId}
          className="relative w-full h-19 p-4 border border-backgrounds-light rounded-6 text-[#999999] mb-3"
        >
          <h4 className="mb-1 text-md">{data.recordName}</h4>
          <p className="text-xs">{data.durationTime}</p>
          <Image
            className="absolute top-1/2 right-[15px] -translate-y-1/2 rotate-90"
            src={'/assets/menu.svg'} // Ensure the correct path for the image
            onClick={() => handleMenuClick(data.recordId)}
            width={24}
            height={24}
            alt="menu"
          />
          {activeMenuId === data.recordId && (
            <div
              ref={menuRef}
              className="absolute top-[calc(50%-12px)] z-10 right-5 shadow-main bg-backgrounds-light text-md"
            >
              <div className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub">
                수정
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                    onClick={() => setRecordToDelete(data.recordId)}
                  >
                    삭제
                  </div>
                </AlertDialogTrigger>
                <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
                <AlertDialogContent className="w-[296px] h-[148px] bg-backgrounds-sub rounded-6 p-0 flex flex-col items-center text-text-main border-none">
                  <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-lg py-[19px] pb-[11px] font-semibold leading-[26px]">
                      기록 삭제
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm font-normal leading-5 text-text-main">
                      해당 기록을 삭제할까요?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center h-12">
                    <AlertDialogCancel
                      className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-light text-center cursor-pointer border-none
                    focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                      onClick={() => setRecordToDelete(undefined)}
                    >
                      취소
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-accent text-center cursor-pointer border-none
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
    </div>
  );
};

export default Record;

const RECORD_DATA = [
  {
    id: 1,
    name: '유산소 루틴 제목',
    date: '2024. 8. 15.(목) - 19:50~20:50',
  },
  {
    id: 2,
    name: '유산소 루틴 제목',
    date: '2024. 8. 15.(목) - 19:50~20:50',
  },
  {
    id: 3,
    name: '유산소 루틴 제목',
    date: '2024. 8. 15.(목) - 19:50~20:50',
  },
];
