import React from 'react';
import Image from 'next/image';
import { Drawer } from '@/components/ui/drawer';

interface CategoryScopeDrawerProps {
  categoryDrawerOpen: boolean;
  handleCategoryDrawerToggle: () => void;
  handleCategoryDrawerClose: () => void;
  handleCategoryChange: (
    scope: 'ALL' | 'FOLLOWING' | 'POPULAR' | 'INFORMATION' | 'FEEDBACK' | 'BODY_REVIEW'
  ) => void;
}

const CategoryScopeDrawer = ({
  categoryDrawerOpen,
  handleCategoryDrawerToggle,
  handleCategoryDrawerClose,
  handleCategoryChange,
}: CategoryScopeDrawerProps) => {
  return (
    <div>
      <Drawer open={categoryDrawerOpen} onClose={handleCategoryDrawerToggle}>
        <div
          className={`fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40 transition-opacity duration-300 ${
            categoryDrawerOpen ? 'opacity-70 visible' : 'opacity-0 invisible'
          }`}
          onClick={handleCategoryDrawerClose}
        ></div>
        <div
          className={`fixed bg-backgrounds-sub h-[260px] w-full text-text-main rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out transform ${
            categoryDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-center items-center h-15">
            <h3 className="font-bold text-xl ">카테고리</h3>
            <Image
              onClick={handleCategoryDrawerClose}
              className="absolute top-4 right-4 cursor-pointer"
              src="/assets/close.svg"
              width={30}
              height={30}
              alt="닫기"
            />
          </div>

          <div
            onClick={() => handleCategoryChange('ALL')}
            className="text-center py-3 text-text-main border-t-[0.5px] border-[#FFFFFF40]"
          >
            전체
          </div>
          <div
            onClick={() => handleCategoryChange('INFORMATION')}
            className="text-center py-3 text-text-main border-t-[0.5px] border-[#FFFFFF40]"
          >
            정보
          </div>
          <div
            onClick={() => handleCategoryChange('FEEDBACK')}
            className="text-center py-3 text-text-main border-t-[0.5px] border-[#FFFFFF40]"
          >
            운동 피드백
          </div>
          <div
            onClick={() => handleCategoryChange('BODY_REVIEW')}
            className="text-center py-3 text-text-main border-t-[0.5px] border-[#FFFFFF40]"
          >
            몸평
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CategoryScopeDrawer;
