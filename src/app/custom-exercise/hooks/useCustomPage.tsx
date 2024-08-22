import { CategoryKey } from '@/constants/exerciseInform';
import useInput from '@/hooks/useInput';
import React, { useCallback, useEffect, useState } from 'react';

const useCustomPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accentCategory, setAccentCategory] = useState<CategoryKey>('tool');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const { value: name, onChange } = useInput('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const toggleDrawer = useCallback((key: CategoryKey) => {
    setAccentCategory(key);
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const handleCategoryListClick = useCallback((key: CategoryKey, itemLabel: string) => {
    if (key === 'tool') {
      setSelectedTool(itemLabel);
    } else if (key === 'bodyPart') {
      setSelectedBodyPart(itemLabel);
    }
    setIsDrawerOpen(false);
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!(name && selectedBodyPart && selectedTool));
  }, [name, selectedBodyPart, selectedTool]);

  return {
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
  };
};

export default useCustomPage;
