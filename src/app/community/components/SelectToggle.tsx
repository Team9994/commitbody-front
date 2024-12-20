'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

interface SelectToggleProps {
  selected: 'certification' | 'question';
  setSelected: React.Dispatch<React.SetStateAction<'certification' | 'question'>>;
}

const SelectToggle = ({ selected, setSelected }: SelectToggleProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabsRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { value: 'certification', label: '운동 인증' },
    { value: 'question', label: '정보&질문' },
  ];

  const updateUrl = (newParam: string) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('menu', newParam);

    router.push(`?${updatedParams.toString()}`);
  };

  const updateUnderline = (selectedTab: string) => {
    if (!tabsRef.current || !underlineRef.current) return;

    const tabElements = tabsRef.current.querySelectorAll<HTMLDivElement>('.tab-item');
    const selectedElement = Array.from(tabElements).find(
      (tab) => tab.dataset.value === selectedTab
    );

    if (selectedElement) {
      const { offsetWidth, offsetLeft } = selectedElement;
      underlineRef.current.style.width = `${offsetWidth}px`;
      underlineRef.current.style.transform = `translateX(${offsetLeft}px)`;
    }
  };

  useEffect(() => {
    updateUnderline(selected);
  }, [selected]);

  return (
    <div className="relative w-full text-base text-center" ref={tabsRef}>
      <div className="flex">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`tab-item flex-grow cursor-pointer py-3 ${
              selected === tab.value ? 'font-bold text-text-main' : 'text-borders-main'
            }`}
            data-value={tab.value}
            onClick={() => {
              setSelected(tab.value as 'certification' | 'question');
              updateUrl(tab.value);
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[0.5px] bg-text-main transition-transform duration-300"
      />
    </div>
  );
};

export default SelectToggle;
