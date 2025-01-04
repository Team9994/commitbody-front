import React from 'react';

interface SelectToggleProps {
  selected: 'follower' | 'following';
  setSelected: React.Dispatch<React.SetStateAction<'follower' | 'following'>>;
}

const SelectToggle = ({ selected, setSelected }: SelectToggleProps) => {
  return (
    <div className="flex w-full text-base text-center">
      <div
        className={`flex-grow basis-0 cursor-pointer py-3 ${
          selected === 'follower'
            ? 'text-text-main font-bold border-b-2 border-text-main'
            : 'text-borders-main border-b-2 border-borders-main'
        }`}
        onClick={() => setSelected('follower')}
      >
        팔로워
      </div>

      <div
        className={`flex-grow basis-0 cursor-pointer py-3 ${
          selected === 'following'
            ? 'text-text-main font-bold border-b-2 border-text-main'
            : 'text-borders-main border-b-2 border-borders-main    '
        }`}
        onClick={() => setSelected('following')}
      >
        팔로잉
      </div>
    </div>
  );
};

export default SelectToggle;
