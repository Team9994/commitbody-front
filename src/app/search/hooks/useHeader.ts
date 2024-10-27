import { usePostSearchRecordMutation } from '@/app/api/search/query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface UseHeaderProps {
  searchParams: any;
  search: string;
}
const useHeader = ({ searchParams, search }: UseHeaderProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const postSearchMutation = usePostSearchRecordMutation();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('mode', 'search');
    router.replace(`?${newParams.toString()}`);
  };

  const handleChangeFocus = () => {
    setIsFocused((pre) => !pre);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }
    router.replace(`?${newParams.toString()}`);
  };

  const handleBack = () => {
    const newParams = new URLSearchParams(searchParams);

    const paramsString = newParams.toString();

    if (paramsString) {
      router.push(`/search`);
      newParams.delete('q');
      newParams.delete('mode');
      setIsFocused(false);
    } else {
      router.push('/community');
    }
  };
  const handlePostSearch = () => {
    if (!search) {
      alert('검색어를 입력해주세요!');
      return;
    }

    postSearchMutation.mutate({ title: search, session });
    setIsFocused(false);
  };
  return { isFocused, handleChangeFocus, handlePostSearch, handleBack, handleChange, handleFocus };
};

export default useHeader;
