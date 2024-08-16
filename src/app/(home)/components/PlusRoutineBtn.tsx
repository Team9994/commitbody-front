import Image from 'next/image';
import React from 'react';

const PlusRoutineBtn = () => {
  return (
    <button className="fixed bottom-[74px] right-4 flex justify-center items-center w-14 h-14 bg-backgrounds-blue rounded-16">
      <Image src="./assets/routinePlus.svg" width={24} height={24} alt="추가하기" />
    </button>
  );
};

export default PlusRoutineBtn;
