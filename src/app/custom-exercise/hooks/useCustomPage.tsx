import { useCustomExerciseMutation } from '@/app/api/exercise/query';
import { CategoryKey } from '@/constants/exerciseInform';
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const useCustomPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const mutation = useCustomExerciseMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accentCategory, setAccentCategory] = useState<CategoryKey>('tool');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { value: name, onChange } = useInput('');

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

  const handleSubmit = async () => {
    mutation.mutate(
      {
        name,
        bodyPart: selectedBodyPart,
        tool: selectedTool,
        image: selectedFile || undefined,
        session,
      },
      {
        onSuccess: (data) => {
          alert('운동 등록에 성공하셨습니다 !');
          router.push('exercise-list');
        },
        onError: (error) => {
          alert('에러');
        },
      }
    );
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
    handleSubmit,
  };
};

export default useCustomPage;
