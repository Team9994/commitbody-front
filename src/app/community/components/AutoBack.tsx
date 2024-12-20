'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AutoBack = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);

  return null; // 렌더링할 UI 없음
};

export default AutoBack;
