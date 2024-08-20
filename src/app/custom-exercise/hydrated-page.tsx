'use client';
import React from 'react';
import DrawerContent from '../exercise_list/components/DrawerContent';
import ImageUpload from './components/ImageUpload';
import InputField from './components/InputField';
import SelectBox from './components/SelectBox';
import SubmitButton from './components/SubmitButton';
import useCustomPage from './hooks/useCustomPage';

const ExerciseCustom = () => {
  const {
    name,
    onChange,
    selectedImage,
    isDrawerOpen,
    accentCategory,
    isButtonDisabled,
    handleImageUpload,
    toggleDrawer,
    handleCategoryListClick,
    selectedBodyPart,
    selectedTool,
    setIsDrawerOpen,
  } = useCustomPage();

  return (
    <div className="flex flex-col items-center h-screen gap-7 bg-backgrounds-default">
      <ImageUpload selectedImage={selectedImage} handleImageUpload={handleImageUpload} />
      <InputField value={name} onChange={onChange} placeholder="운동 이름을 입력하세요." />
      <SelectBox
        label="도구를 선택해주세요"
        value={selectedTool}
        onClick={() => toggleDrawer('tool')}
      />
      <SelectBox
        label="부위를 선택해주세요"
        value={selectedBodyPart}
        onClick={() => toggleDrawer('bodyPart')}
      />
      {isDrawerOpen && (
        <DrawerContent
          toggleDrawer={() => setIsDrawerOpen(false)}
          accentCategory={accentCategory}
          handleCategoryListClick={handleCategoryListClick}
        />
      )}
      <SubmitButton isDisabled={isButtonDisabled} />
    </div>
  );
};

export default ExerciseCustom;
