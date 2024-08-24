import React, { Dispatch } from 'react';
interface SelectToggleProps {
  selected: 'explain' | 'record';
  setSelected: React.Dispatch<React.SetStateAction<'explain' | 'record'>>;
}

const SelectToggle = ({ selected, setSelected }: SelectToggleProps) => {
  return (
    <div className="flex w-full text-base text-center">
      <div
        className={`flex-grow basis-0 cursor-pointer py-3 ${
          selected === 'explain'
            ? 'text-text-main font-bold border-b-2 border-text-main'
            : 'text-borders-main border-b-2 border-borders-main'
        }`}
        onClick={() => setSelected('explain')}
      >
        설명
      </div>
      <div
        className={`flex-grow basis-0 cursor-pointer py-3 ${
          selected === 'record'
            ? 'text-text-main font-bold border-b-2 border-text-main'
            : 'text-borders-main border-b-2 border-borders-main'
        }`}
        onClick={() => setSelected('record')}
      >
        기록/분석
      </div>
    </div>
  );
};

export default SelectToggle;
