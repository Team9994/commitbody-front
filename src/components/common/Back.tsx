'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Back = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        onClick={() => router.back()}
        priority
        src={'/assets/back.svg'}
        alt={'뒤로가기'}
        width={24}
        height={24}
      />
    </div>
  );
};

export default Back;
