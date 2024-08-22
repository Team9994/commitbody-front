'use client';
import React from 'react';
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
