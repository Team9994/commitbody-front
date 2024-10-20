import { Drawer } from '@/components/ui/drawer';
import React from 'react';
import Image from 'next/image';

interface MarkScopeDrawerProps {
  markScopeDrawerOpen: boolean;
  handleMarkScopeDrawerToggle: () => void;
  handleMarkScopeDrawerClose: () => void;
  handleMarkScopeChange: (scope: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE') => void;
}

const MarkScopeDrawer = ({
  markScopeDrawerOpen,
  handleMarkScopeDrawerToggle,
  handleMarkScopeDrawerClose,
  handleMarkScopeChange,
}: MarkScopeDrawerProps) => {
  return (
    <div>
      <Drawer open={markScopeDrawerOpen} onClose={handleMarkScopeDrawerToggle}>
        <div
          className={`fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40 transition-opacity duration-300 ${
            markScopeDrawerOpen ? 'opacity-70 visible' : 'opacity-0 invisible'
          }`}
          onClick={handleMarkScopeDrawerClose}
        ></div>
        <div
          className={`fixed bg-backgrounds-sub h-[210px] w-full text-text-main rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out transform ${
            markScopeDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-center items-center h-15">
            <h3 className="font-bold text-xl ">공개범위</h3>
            <Image
              onClick={handleMarkScopeDrawerClose}
              className="absolute top-4 right-4 cursor-pointer"
              src="/assets/close.svg"
              width={30}
              height={30}
              alt="닫기"
            />
          </div>

          <div
            onClick={() => handleMarkScopeChange('PUBLIC')}
            className="text-center py-3 text-text-main border-t-[0.5px] border-[#FFFFFF40]"
          >
            전체 공개
          </div>
          <div
            onClick={() => handleMarkScopeChange('FOLLOWERS_ONLY')}
            className="text-center py-3 text-text-main border-t-[0.5px] border-[#FFFFFF40]"
          >
            팔로워에게만 공개
          </div>
          <div
            onClick={() => handleMarkScopeChange('PRIVATE')}
            className="text-center py-3 text-text-main border-t-[0.5px] border-[#FFFFFF40]"
          >
            비공개
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MarkScopeDrawer;
