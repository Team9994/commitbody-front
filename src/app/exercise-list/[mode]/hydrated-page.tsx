'use client';
import React from 'react';
import Search from './components/Search';
import useExerciseList from './hooks/useExerciseList';
import ExerciseListData from './components/ExerciseListData';
import ToggleList from './components/ToggleList';
import ScrollUpBtn from './components/ScrollUpBtn';
import AddExerciseBtn from './components/AddExerciseBtn';

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
    mode,
  } = useExerciseList();

  return (
    <div>
      <div>{mode}</div>
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
      <AddExerciseBtn />

      <ExerciseListData
        scrollRef={scrollRef}
        exerciseList={exerciseList}
        handleLikeToggle={handleLikeToggle}
        handleListClick={handleListClick}
        mode={mode}
      />
      <ScrollUpBtn scrollRef={scrollRef} mode={mode} />
    </div>
  );
};

export default ExserciseList;
