'use client';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // or 'next/router' if in the pages directory
import React, { Suspense } from 'react';
import AlarmList from './components/AlarmList';

const Alarm = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-backgrounds-default text-text-main">
      <Header
        left={
          <div onClick={() => router.back()}>
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        center={<h4 className="text-xl font-semibold leading-7 text-text-main">알림</h4>}
        right={<div className="opacity-0">무</div>}
        className="relative z-20"
      />
      <Suspense fallback={'loading...'}>
        <AlarmList />
      </Suspense>
    </div>
  );
};

export default Alarm;
