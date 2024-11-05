// useCalender.tsx
import { useRecord } from '@/app/api/record/query';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { RoutineRecord } from '../types/record';

const useCalender = () => {
  const { data: session } = useSession();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectedRoutines, setSelectedRoutines] = useState<RoutineRecord[]>([]);
  const [drawerToggle, setDrawerToggle] = useState(false);

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

  const handleMultipleRoutinesClick = (data: RoutineRecord[]) => {
    setSelectedRoutines(data);
    setDrawerToggle(true);
    console.log(data);
  };

  const handleSingleRoutineClick = () => {};
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
