// Record.tsx
'use client';
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import useCalender from './hooks/useCalender';
import { Drawer } from '@/components/ui/drawer';
import Image from 'next/image';

const Record = () => {
  const {
    year,
    month,
    moveMonth,
    data,
    handleMultipleRoutinesClick,
    handleSingleRoutineClick,
    selectedRoutines,
    drawerToggle,
    toggleDrawer,
  } = useCalender();

  return (
    <div className="w-full min-h-screen px-3 bg-backgrounds-default text-white flex flex-col items-center pb-[58px]">
      <Calendar
        mode="single"
        data={data?.data}
        className="mt-3 mb-6"
        moveMonth={moveMonth}
        handleMultipleRoutinesClick={handleMultipleRoutinesClick}
        handleSingleRoutineClick={handleSingleRoutineClick}
        curYear={year}
        curMonth={month}
      />

      {data?.data.records.map((data: any) => (
        <div
          key={data.recordId}
          className="relative w-full h-19 p-4 border border-backgrounds-light rounded-6 text-[#999999] mb-3"
        >
          <h4 className="mb-1 text-md">{data.recordName}</h4>
          <p className="text-xs">{data.durationTime}</p>
        </div>
      ))}

      <Drawer open={drawerToggle} onClose={toggleDrawer}>
        <div
          className={`fixed w-full h-screen inset-0 bg-[#000000] z-40 ${
            drawerToggle ? 'opacity-70 visible' : 'opacity-0 invisible'
          }`}
          onClick={toggleDrawer}
        ></div>
        <div
          className={`fixed bg-backgrounds-sub max-h-[350px] w-full rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 text-center transition-transform duration-300 ease-in-out transform ${
            drawerToggle ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <h3 className="text-lg h-16 text-text-main font-bold py-5 border-backgrounds-light">
            {selectedRoutines[0]?.durationTime.split('·')[0].trim()}
          </h3>
          <Image
            onClick={toggleDrawer}
            className="absolute top-4 right-4 cursor-pointer"
            src="/assets/close.svg"
            width={30}
            height={30}
            alt="닫기"
          />

          <div className="p-4">
            {selectedRoutines?.map((routine, index) => (
              <div
                key={routine.recordId}
                className="text-left relative w-full h-19 p-4 border border-backgrounds-light rounded-6 text-[#999999] mb-3"
              >
                <h4 className="mb-1 text-md">{routine.recordName}</h4>
                <p className="text-xs">{routine.durationTime}</p>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Record;
