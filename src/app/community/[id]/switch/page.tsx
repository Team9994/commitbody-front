'use client';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import React from 'react';
import ImageUpload from '../../writePost/components/ImageUpload';
import { Input } from '@/components/ui/input';
import ImageDrawer from '../../writePost/components/ImageDrawer';
import MarkScopeDrawer from '../../writePost/components/MarkScopeDrawer';
import CategoryScopeDrawer from '../../writePost/components/CategoryScopeDrawer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import { AlertDialogHeader } from '@/components/ui';
import {
  alertPostBoard,
  mapQueryCategoryToCategory,
  mapQueryMarkScopeToMarkScope,
} from '../../utils';
import useBoardChange from '../../hooks/useBoardChange';

const BoardChange = () => {
  const {
    type,
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
  } = useBoardChange();

  return (
    <div>
      <Header
        className="bg-backgrounds-default"
        left={
          <div
            onClick={() => {
              router.back();
            }}
          >
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        center={<h4 className="text-xl font-semibold leading-7 text-text-main">게시글 수정</h4>}
        right={
          <span onClick={handlePostSumit} className="font-bold text-blue text-base">
            완료
          </span>
        }
      />
      <ImageUpload handleDrawerToggle={handleDrawerToggle} selectedImage={selectedImage} />
      <div className="px-5 text-text-main text-md">
        {type === 'question' && (
          <div
            onClick={handleCategoryDrawerToggle}
            className="flex justify-between border-b border-backgrounds-light h-15 items-center"
          >
            <span>
              {categoryScope ? mapQueryCategoryToCategory(categoryScope) : '카테고리를 선택하세요'}
            </span>
            <Image
              src="/assets/back.svg"
              alt="더보기"
              width={20}
              height={20}
              className="-rotate-90 mb-[10px]"
            />
          </div>
        )}

        <div
          onClick={handleMarkScopeDrawerToggle}
          className="flex justify-between border-b border-backgrounds-light h-15 items-center"
        >
          <span>{markScope ? mapQueryMarkScopeToMarkScope(markScope) : '전체 공개'}</span>
          <Image
            src="/assets/back.svg"
            alt="더보기"
            width={20}
            height={20}
            className="-rotate-90 mb-[10px]"
          />
        </div>
        {type === 'question' && (
          <div className="border-b border-backgrounds-light py-2">
            <Input
              className="placeholder-gray-500 text-base bg-transparent border-none focus:outline-none focus:ring-0 p-0 custom-placeholder"
              placeholder="제목"
              onChange={titleChange}
              style={{ boxShadow: 'none' }}
            />
          </div>
        )}

        <Input
          className="mt-2 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
          placeholder="내용을 입력하세요"
          onChange={contentChange}
          style={{ boxShadow: 'none' }}
        />
      </div>

      <ImageDrawer
        handleImageUpload={handleImageUpload}
        imageDrawerOpen={imageDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MarkScopeDrawer
        markScopeDrawerOpen={markScopeDrawerOpen}
        handleMarkScopeDrawerToggle={handleMarkScopeDrawerToggle}
        handleMarkScopeDrawerClose={handleMarkScopeDrawerClose}
        handleMarkScopeChange={handleMarkScopeChange}
      />

      {type === 'question' && (
        <CategoryScopeDrawer
          categoryDrawerOpen={categoryDrawerOpen}
          handleCategoryDrawerToggle={handleCategoryDrawerToggle}
          handleCategoryDrawerClose={handleCategoryDrawerClose}
          handleCategoryChange={handleCategoryChange}
        />
      )}

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
        <AlertDialogContent className="w-[296px] h-[148px] bg-backgrounds-sub rounded-6 p-2 flex flex-col items-center text-text-main border-none">
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-lg py-[11px] font-bold leading-[26px]">
              알림
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center h-12">
            <h3 className="h-11 text-center text-sm mb-4">
              {alertPostBoard(type, title, content, selectedFile, categoryScope)}
            </h3>
            <AlertDialogAction
              className="w-full h-full text-blue m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-center cursor-pointer border-none
            focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
              onClick={handleDialogClose}
            >
              확인
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BoardChange;
