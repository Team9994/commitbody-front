'use client';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // or 'next/router' if in the pages directory
import React from 'react';
import { useAlarm } from '../api/alarm/query';

const Alarm = () => {
  const router = useRouter();
  const { data } = useAlarm();

  console.log(data.data?.notifications);
  console.log(data.data?.notifications.map);
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
      {data.data?.notifications.length === 0 && (
        <p className="text-center mt-20 text-text-light">알림이 없습니다.</p>
      )}
    </div>
  );
};

export default Alarm;
