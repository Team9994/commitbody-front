'use client';
import Header from '@/components/layouts/Header';
import React, { Suspense } from 'react';
import Back from '../../components/common/Back';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ExerciseCustomlayout({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();

  const LayoutContent = () => {
    const searchParam = useSearchParams();
    const status = searchParam.get('status');

    return (
      <>
        <Header
          className={'bg-backgrounds-default'}
          left={
            <div onClick={() => router.back()}>
              <Back />
            </div>
          }
          center={
            <h4 className="text-xl font-semibold leading-7 text-text-main">
              {status === 'edit' ? '커스텀 운동 수정' : '커스텀 운동 추가'}
            </h4>
          }
          right={<div style={{ visibility: 'hidden', width: '24px' }} />}
        />
        {children}
      </>
    );
  };

  return (
    <Suspense fallback={<div>Loading Layout...</div>}>
      <LayoutContent />
    </Suspense>
  );
}
