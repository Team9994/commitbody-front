import Image from 'next/image';
import React from 'react';

interface SelectBoxProps {
  label: string;
  value: string;
  onClick: () => void;
}

const SelectBox = ({ label, value, onClick }: SelectBoxProps) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between w-[320px] h-[52px] px-4 placeholder:text-base bg-backgrounds-sub rounded-md cursor-pointer ${
      value ? 'border border-blue text-blue' : 'border-gray-400 text-text-placeholder'
    }`}
  >
    <span>{value || label}</span>
    <Image
      style={{
        transform: 'rotate(-90deg)',
        marginBottom: '0.5rem',
        filter: value
          ? 'invert(57%) sepia(83%) saturate(2567%) hue-rotate(182deg) brightness(92%) contrast(101%)'
          : 'invert(40%) sepia(10%) saturate(0%) hue-rotate(0deg) brightness(70%) contrast(90%)',
      }}
      src="/assets/back.svg"
      width={24}
      height={24}
      alt="더보기"
    />
  </div>
);
export default SelectBox;
