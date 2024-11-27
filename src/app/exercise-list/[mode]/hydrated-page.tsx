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
    handleChange,
    toggleDrawer,
    handleCategoryClick,
    handleCategoryListClick,
    handleListClick,
    scrollRef,
    mode,
    routines,
    getRoutineCount,
    deleteRoutine,
    selectedExerciseIds,
    observerRef,
    searchResults,
    filters,
  } = useExerciseList();
  return (
    <div>
      <Search onChange={handleChange} />

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
        filters={filters}
        scrollRef={scrollRef}
        searchResults={searchResults?.pages.flat() || []}
        handleListClick={handleListClick}
        mode={mode}
        selectedExerciseIds={selectedExerciseIds}
        observerRef={observerRef}
      />

      {mode === 'routine' && (
        <AddExerciseBtn
          count={getRoutineCount()}
          routines={routines}
          deleteRoutine={deleteRoutine}
        />
      )}

      <ScrollUpBtn scrollRef={scrollRef} mode={mode} />
    </div>
  );
};

export default ExserciseList;
