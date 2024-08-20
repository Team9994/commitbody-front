import { CategoryKey, EXERCISE_LIST } from '@/constants/exerciseInform';
import Image from 'next/image';
import React from 'react';

interface DrawerContentProps {
  toggleDrawer: () => void;
  accentCategory: CategoryKey;
  handleCategoryListClick: (key: CategoryKey, itemLabel: string) => void;
}
const DrawerContent = ({
  toggleDrawer,
  accentCategory,
  handleCategoryListClick,
}: DrawerContentProps) => {
  const category = EXERCISE_LIST[accentCategory];

  if (!category) return null;

  return (
    <>
      <div
        className="fixed w-full h-screen inset-0 bg-[#000000] opacity-70 z-10"
        onClick={toggleDrawer}
      ></div>
      <div className="fixed bg-backgrounds-sub h-[570px] w-full rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 text-center">
        <div className="relative z-20">
          <h3 className="text-lg h-16 text-white font-bold py-5 border-b-[1px] border-b-solid border-backgrounds-light">
            {category.label}
          </h3>
          <Image
            onClick={toggleDrawer}
            className="absolute top-4 right-4"
            src="assets/close.svg"
            width={30}
            height={30}
            alt="닫기"
          />

          <ul className="text-white">
            {Object.entries(category.items).map(([itemKey, itemLabel]) => (
              <li
                onClick={() => handleCategoryListClick(accentCategory, itemLabel)}
                key={itemKey}
                className="py-3 h-12 text-base hover:bg-gray-700 rounded cursor-pointer border-b-[1px] border-b-solid border-backgrounds-light"
              >
                {itemLabel}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrawerContent;
