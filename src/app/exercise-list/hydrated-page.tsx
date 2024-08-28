'use client';
import React, { useEffect, useRef, useState } from 'react';
import Search from './components/Search';
import useExerciseList from './hooks/useExerciseList';
import ExerciseListData from './components/ExerciseListData';
import ToggleList from './components/ToggleList';
import ScrollUpBtn from './components/ScrollUpBtn';

const ExserciseList = () => {
  const {
    selectedCategory,
    selectedTool,
    selectedBodyPart,
    drawerToggle,
    accentCategory,
    onChange,
    toggleDrawer,
    handleCategoryClick,
    handleCategoryListClick,
    handleListClick,
    scrollRef,
    observerRef,
    searchResults,
  } = useExerciseList();
  return (
    <div>
      <Search onChange={onChange} />

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
        searchResults={searchResults?.pages.flat() || []}
        handleListClick={handleListClick}
        observerRef={observerRef}
      />

      <ScrollUpBtn scrollRef={scrollRef} />
    </div>
  );
};

export default ExserciseList;
