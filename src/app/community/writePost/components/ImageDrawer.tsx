import { Drawer } from '@/components/ui/drawer';
import React from 'react';
import Image from 'next/image';

interface ImageDrawerProps {
  imageDrawerOpen: boolean;
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageDrawer = ({
  imageDrawerOpen,
  handleDrawerToggle,
  handleDrawerClose,
  handleImageUpload,
}: ImageDrawerProps) => {
  return (
    <div>
      <Drawer open={imageDrawerOpen} onClose={handleDrawerToggle}>
        <div
          className={`fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40 transition-opacity duration-300 ${
            imageDrawerOpen ? 'opacity-70 visible' : 'opacity-0 invisible'
          }`}
          onClick={handleDrawerClose}
        ></div>
        <div
          className={`fixed bg-backgrounds-sub h-[170px] w-full text-text-main rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out transform ${
            imageDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex justify-center items-center h-15">
            <Image
              onClick={handleDrawerClose}
              className="absolute top-4 right-4 cursor-pointer"
              src="/assets/close.svg"
              width={30}
              height={30}
              alt="닫기"
            />
          </div>

          <label
            htmlFor="image-upload"
            className="block text-center py-3 text-text-main border-t border-[#FFFFFF40]"
          >
            사진 등록
          </label>
          <label
            htmlFor="image-upload"
            className="block text-center py-3 text-text-main border-t border-[#FFFFFF40]"
          >
            영상 등록
          </label>
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </Drawer>
    </div>
  );
};

export default ImageDrawer;
