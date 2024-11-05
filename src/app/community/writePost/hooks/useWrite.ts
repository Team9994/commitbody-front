import { useArticlePostCommunityMutation } from '@/app/api/community/query';
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

const useWrite = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cur = searchParams.get('cur');
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDrawerOpen, setImageDrawerOpen] = useState(false);
  const [markScopeDrawerOpen, setMarkScopeDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const [categoryScope, setCategoryScope] = useState<
    'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW' | ''
  >('');
  const [markScope, setMarkScope] = useState<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>('PUBLIC');
  const { value: title, onChange: titleChange } = useInput();
  const { value: content, onChange: contentChange } = useInput();

  const { mutate } = useArticlePostCommunityMutation();

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

  const handlePostSumit = () => {
    const type = cur === 'certification' ? 'EXERCISE' : 'INFO_QUESTION';

    if (type === 'INFO_QUESTION' && (!title || !content || !categoryScope || !markScope)) {
      setAlertDialogOpen(true);
      return;
    }

    if (type === 'EXERCISE' && (!selectedFile || !content || !markScope)) {
      setAlertDialogOpen(true);
      return;
    }

    mutate({
      title,
      content,
      articleType: type,
      image: selectedFile,
      visibility: markScope,
      articleCategory: categoryScope,
      session,
    });

    router.push('/community');
  };

  const handleMarkScopeChange = (scope: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE') => {
    setMarkScope(scope);
  };

  const handleCategoryChange = (
    scope: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW'
  ) => {
    setCategoryScope(scope);
  };

  const handleCategoryDrawerToggle = () => {
    setCategoryDrawerOpen((pre) => !pre);
  };

  const handleCategoryDrawerClose = () => {
    setCategoryDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setImageDrawerOpen((pre) => !pre);
  };

  const handleDrawerClose = () => {
    setImageDrawerOpen(false);
  };

  const handleMarkScopeDrawerToggle = () => {
    setMarkScopeDrawerOpen((pre) => !pre);
  };

  const handleMarkScopeDrawerClose = () => {
    setMarkScopeDrawerOpen(false);
  };

  const handleDialogOpen = () => {
    setAlertDialogOpen(true);
  };

  const handleDialogClose = () => {
    setAlertDialogOpen(false);
  };

  return {
    cur,
    handleImageUpload,
    handleDrawerToggle,
    handleDrawerClose,
    handleMarkScopeDrawerToggle,
    handleMarkScopeDrawerClose,
    handleDialogOpen,
    handleDialogClose,
    handleMarkScopeChange,
    selectedImage,
    imageDrawerOpen,
    markScopeDrawerOpen,
    alertDialogOpen,
    setAlertDialogOpen,
    titleChange,
    contentChange,
    title,
    content,
    selectedFile,
    handleCategoryChange,
    handleCategoryDrawerToggle,
    handleCategoryDrawerClose,
    categoryDrawerOpen,
    categoryScope,
    markScope,
    router,
    handlePostSumit,
  };
};

export default useWrite;
