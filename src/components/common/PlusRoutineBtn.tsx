import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// TODO : 추후 공통 컴포넌트로 이동
const PlusRoutineBtn = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="fixed bottom-[74px] right-4 flex justify-center items-center w-14 h-14 bg-backgrounds-blue rounded-16"
    >
      <Image priority src="/assets/routinePlus.svg" width={24} height={24} alt="추가하기" />
    </Link>
  );
};

export default PlusRoutineBtn;