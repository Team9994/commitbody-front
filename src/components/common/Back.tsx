'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Back = () => {
  return (
    <div>
      <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
    </div>
  );
};

export default Back;
