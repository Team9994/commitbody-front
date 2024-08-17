'use client';
import React from 'react';
import Search from './components/Search';
import useInput from '@/hooks/useInput';

const ExerciseList = () => {
  const { value: searchData, onChange } = useInput('');
  return (
    <div>
      <Search searchData={searchData} />
    </div>
  );
};

export default ExerciseList;
