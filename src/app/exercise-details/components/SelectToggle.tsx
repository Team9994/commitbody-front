import React, { useEffect, useRef, useState } from 'react';

interface SelectToggleProps {
  selected: 'explain' | 'record';
  setSelected: React.Dispatch<React.SetStateAction<'explain' | 'record'>>;
  type: string | null;
}

const SelectToggle = ({ selected, setSelected, type }: SelectToggleProps) => {
  const explainRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const selectedRef = selected === 'explain' ? explainRef.current : recordRef.current;

    if (selectedRef) {
      const { offsetWidth, offsetLeft } = selectedRef;
      setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [selected]);

  return (
    <div className="relative flex w-full text-base text-center">
      {/* 밑줄 */}
      <div
        className="absolute bottom-0 h-0.5 bg-text-main transition-all duration-300 ease-in-out"
        style={{
          width: `${underlineStyle.width}px`,
          transform: `translateX(${underlineStyle.left}px)`,
        }}
      ></div>

      {/* 설명 버튼 */}
      {type === 'default' && (
        <div
          ref={explainRef}
          className={`flex-grow basis-0 cursor-pointer py-3 ${
            selected === 'explain'
              ? 'text-text-main font-bold border-b-0'
              : 'text-borders-main border-b border-borders-main'
          }`}
          onClick={() => setSelected('explain')}
        >
          설명
        </div>
      )}

      {/* 기록/분석 버튼 */}
      <div
        ref={recordRef}
        className={`flex-grow basis-0 cursor-pointer py-3 ${
          selected === 'record'
            ? 'text-text-main font-bold border-b-0'
            : 'text-borders-main border-b border-borders-main'
        }`}
        onClick={() => setSelected('record')}
      >
        기록/분석
      </div>
    </div>
  );
};

export default SelectToggle;
