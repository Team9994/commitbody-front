import { useCustomExerciseEditMutation, useCustomExerciseMutation } from '@/app/api/exercise/query';
import useInput from '@/hooks/useInput';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { CategoryKey } from '../constants';

const useCustomPage = () => {
  const router = useRouter();
  const customExerciseCreateMutation = useCustomExerciseMutation();
  const customExerciseEditMutation = useCustomExerciseEditMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accentCategory, setAccentCategory] = useState<CategoryKey>('tool');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { value: name, onChange } = useInput('');
  const searchParam = useSearchParams();
  const status = searchParam.get('status');
  const exerciseId = searchParam.get('exerciseId');

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
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

  const handleCreateSubmit = async () => {
    customExerciseCreateMutation.mutate(
      {
        name,
        bodyPart: selectedBodyPart,
        tool: selectedTool,
        image: selectedFile || undefined,
      },
      {
        onSuccess: (data) => {
          alert('운동 등록에 성공하셨습니다 !');
          router.push('exercise-list/search');
        },
        onError: (error) => {
          alert('에러');
        },
      }
    );
  };

  const handleEditExerciseSubmit = () => {
    const editPayload = {
      customExerciseId: exerciseId,
      name,
      bodyPart: selectedBodyPart,
      tool: selectedTool,
      image: selectedFile || undefined,
      source: 'custom',
    };

    customExerciseEditMutation.mutate(editPayload, {
      onSuccess: () => {
        alert('운동 수정에 성공하셨습니다!');
        router.push('/exercise-list');
      },
      onError: (error) => {
        alert('운동 수정 중 에러가 발생했습니다.');
        console.error(error);
      },
    });
  };

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
    handleCreateSubmit,
    handleEditExerciseSubmit,
    status,
  };
};

export default useCustomPage;
