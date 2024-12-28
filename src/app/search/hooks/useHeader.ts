import { usePostSearchRecordMutation } from '@/app/api/search/query';
import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface UseHeaderProps {}

const useHeader = () => {
  const router = useRouter();
  const postSearchMutation = usePostSearchRecordMutation();
  const [isFocused, setIsFocused] = useState(false);
  const { value, onChange, reset } = useInput();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleChangeFocus = () => {
    setIsFocused((pre) => !pre);
  };

  const handleBack = () => {
    if (value) {
      reset();
      router.push(`/search`);
      setIsFocused(false);
    } else {
      router.push('/community');
    }
  };
  const handlePostSearch = () => {
    if (!value) {
      alert('검색어를 입력해주세요!');
      return;
    }

    postSearchMutation.mutate({ title: value });
    setIsFocused(false);
  };
  return {
    isFocused,
    handleChangeFocus,
    handlePostSearch,
    handleBack,
    value,
    onChange,
    handleFocus,
  };
};

export default useHeader;
