import React from 'react';

interface CategoryListProps {
  onClick: (label: string) => void;
  selected: any;
  label: string;
}

const CategoryList = ({ selected, onClick, label }: CategoryListProps) => {
  return (
    <div
      className={`px-4 py-2 flex items-center text-text-sm justify-center rounded-[18px] border border-backgrounds-light min-w-[57px] flex-shrink-0 ${
        selected ? 'border-blue text-blue bg-[#1F3750]' : 'bg-transparent text-text-sub'
      } cursor-pointer`}
      onClick={() => onClick(label)}
    >
      <span className="text-sm whitespace-nowrap">{label}</span> {/* 줄바꿈 방지 */}
    </div>
  );
};

export default CategoryList;
