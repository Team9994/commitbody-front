import { CategoryKey, EXERCISE_LIST } from '@/app/custom-exercise/constants';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const category = EXERCISE_LIST[accentCategory];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!category) return null;

  return (
    <div
      className={`fixed max-w-[500px] bg-backgrounds-sub mx-auto h-[570px] rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 text-center transition-transform duration-300 ease-in-out transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="relative">
        <h3 className="text-lg h-16 text-white font-bold py-5 border-b-[1px] border-b-solid border-backgrounds-light">
          {category.label}
        </h3>
        <Image
          onClick={toggleDrawer}
          className="absolute top-4 right-4 cursor-pointer"
          src="/assets/close.svg"
          width={30}
          height={30}
          alt="닫기"
        />

        <ul className="text-white">
          {Object.entries(category.items).map(([itemKey, itemLabel]) => (
            <li
              onClick={() => handleCategoryListClick(accentCategory, itemLabel)}
              key={itemKey}
              className="py-3 h-12 text-base hover:bg-gray-700  rounded cursor-pointer border-b-[.1px] border-b-solid border-backgrounds-light"
            >
              {itemLabel}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DrawerContent;
