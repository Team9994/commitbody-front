import Image from 'next/image';
import React from 'react';

const RoutineList = () => {
  return (
    <div>
      {RoutineData.map((data) => {
        return (
          <div
            className="bg-[#292C33] rounded-[6px] h-[76px] box-border mb-3 mx-5 p-4 text-[#EDEDED] relative"
            key={data.id}
          >
            <p className="text-[15px] leading-[22px]">{data.title}</p>

            {data.parts.map((part) => {
              return (
                <span className="text-[12px] leading-[18px] text-[#999999] mr-[6px]" key={part}>
                  {part}
                </span>
              );
            })}
            <Image
              src={'./assets/menu.svg'}
              alt="menu"
              width={24}
              height={24}
              className="absolute top-1/2 right-[20px] transform -translate-y-1/2 rotate-90"
            />
          </div>
        );
      })}
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
