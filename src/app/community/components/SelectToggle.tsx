'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface SelectToggleProps {
  selected: 'certification' | 'question';
  setSelected: React.Dispatch<React.SetStateAction<'certification' | 'question'>>;
}

const SelectToggle = ({ selected, setSelected }: SelectToggleProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = (newParam: string) => {
    console.log(searchParams);
    const updatedParams = new URLSearchParams(searchParams.toString());
    console.log(updatedParams.toString());
    updatedParams.set('menu', newParam);

    // 새로운 URL로 이동
    router.push(`?${updatedParams.toString()}`);
  };

  return (
    <div className="flex w-full text-base text-center">
      <div
        className={`flex-grow basis-0 cursor-pointer py-3 ${
          selected === 'certification'
            ? 'text-text-main font-bold border-b-2 border-text-main'
            : 'text-borders-main border-b-2 border-borders-main'
        }`}
        onClick={() => {
          setSelected('certification');
          updateUrl('certification');
        }}
      >
        운동 인증
      </div>

      <div
        className={`flex-grow basis-0 cursor-pointer py-3 ${
          selected === 'question'
            ? 'text-text-main font-bold border-b-2 border-text-main'
            : 'text-borders-main border-b-2 border-borders-main'
        }`}
        onClick={() => {
          setSelected('question');
          updateUrl('question');
        }}
      >
        정보&질문
      </div>
    </div>
  );
};

export default SelectToggle;
