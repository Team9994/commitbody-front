'use client';
import React, { useEffect, useRef, useState } from 'react';
import Search from './components/Search';
import useExerciseList from './hooks/useExerciseList';
import ExerciseListData from './components/ExerciseListData';
import ToggleList from './components/ToggleList';
import ScrollUpBtn from './components/ScrollUpBtn';
import { useSession } from 'next-auth/react';
import { getSearchExercise } from '../api/exercise';
import { useInfiniteQuery } from '@tanstack/react-query';

const ExserciseList = () => {
  const {
    selectedCategory,
    selectedTool,
    selectedBodyPart,
    drawerToggle,
    accentCategory,
    searchData,
    onChange,
    toggleDrawer,
    handleCategoryClick,
    handleCategoryListClick,
    handleListClick,
    handleLikeToggle,
    exerciseList,
    scrollRef,
  } = useExerciseList();

  // const { data: session } = useSession();
  // const [filters, setFilters] = useState({
  //   name: '',
  //   target: '',
  //   equipment: '',
  //   favorite: false,
  // });
  // const [size, setSize] = useState(20);
  // const observerRef = useRef(null);
  // const [from, setFrom] = useState(0);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (observerRef.current) {
  //     observer.observe(observerRef.current);
  //   }

  //   return () => {
  //     if (observerRef.current) observer.unobserve(observerRef.current);
  //   };
  // }, [hasNextPage, fetchNextPage]);

  // // 필터 변경 시 데이터를 초기화하고 새로 불러오기
  // const handleFilterChange = (newFilters: any) => {
  //   setFilters(newFilters);
  //   setFrom(0);
  // };

  return (
    <div>
      <Search searchData={searchData} />

      <ToggleList
        selectedCategory={selectedCategory}
        selectedTool={selectedTool}
        selectedBodyPart={selectedBodyPart}
        drawerToggle={drawerToggle}
        accentCategory={accentCategory}
        toggleDrawer={toggleDrawer}
        handleCategoryClick={handleCategoryClick}
        handleCategoryListClick={handleCategoryListClick}
      />

      <ExerciseListData
        scrollRef={scrollRef}
        exerciseList={exerciseList}
        handleLikeToggle={handleLikeToggle}
        handleListClick={handleListClick}
      />
      <ScrollUpBtn scrollRef={scrollRef} />
    </div>
  );
};

export default ExserciseList;
