// useCalender.tsx
import { useRecord } from '@/app/api/record/query';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const useCalender = () => {
  const { data: session } = useSession();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectedRoutines, setSelectedRoutines] = useState<any[]>([]); // 선택된 루틴 리스트 상태
  const [drawerToggle, setDrawerToggle] = useState(false); // Drawer 열림 상태

  const { data, error, isLoading, refetch } = useRecord({
    year: String(year),
    month: String(month),
    session,
  });

  useEffect(() => {
    refetch();
  }, [year, month, refetch]);

  const moveMonth = (direction: 'Left' | 'Right') => {
    if (direction === 'Left') {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else if (direction === 'Right') {
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  // 루틴이 2개 이상 있는 경우의 클릭 핸들러
  const handleMultipleRoutinesClick = (data: any) => {
    setSelectedRoutines(data); // 해당 날짜의 루틴들을 상태로 저장
    setDrawerToggle(true); // Drawer를 열기
    console.log(data);
  };

  const handleSingleRoutineClick = (data: any) => {};
  // Drawer를 닫는 함수
  const toggleDrawer = () => {
    setDrawerToggle(!drawerToggle);
  };

  return {
    year,
    month,
    moveMonth,
    data,
    error,
    isLoading,
    handleMultipleRoutinesClick,
    handleSingleRoutineClick,
    toggleDrawer,
    selectedRoutines,
    drawerToggle,
  };
};

export default useCalender;
