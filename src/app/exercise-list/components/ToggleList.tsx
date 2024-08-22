import EXERCISE_LIST, { CategoryKey } from '@/constants/exerciseInform';
import React from 'react';
import CategoryItem from './CategoryItem';
import { Drawer } from '@/components/ui/drawer';
import DrawerContent from './DrawerContent';

interface ToggleListProps {
  selectedCategory: string[];
  selectedTool: string;
  selectedBodyPart: string;
  drawerToggle: boolean;
  accentCategory: CategoryKey;
  toggleDrawer: () => void;
  handleCategoryClick: (categoryKey: CategoryKey, hasItems: boolean) => void;
  handleCategoryListClick: (key: string, itemLabel: string) => void;
}

const ToggleList = ({
  selectedCategory,
  selectedTool,
  selectedBodyPart,
  drawerToggle,
  accentCategory,
  toggleDrawer,
  handleCategoryClick,
  handleCategoryListClick,
}: ToggleListProps) => {
  return (
    <>
      <div className="flex gap-2 pl-5 overflow-x-scroll">
        {Object.entries(EXERCISE_LIST).map(([categoryKey, { label, items }]) => {
          const hasItems = items && Object.keys(items).length > 0;
          return (
            <CategoryItem
              key={categoryKey}
              categoryKey={categoryKey as CategoryKey}
              label={label}
              selected={selectedCategory.includes(categoryKey)}
              onClick={() => handleCategoryClick(categoryKey as CategoryKey, hasItems)}
              hasItems={hasItems}
              selectedTool={selectedTool}
              selectedBodyPart={selectedBodyPart}
            />
          );
        })}
      </div>
      <Drawer open={drawerToggle} onClose={toggleDrawer}>
        <div
          className={`fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40 transition-opacity duration-300 ${
            drawerToggle ? 'opacity-70 visible' : 'opacity-0 invisible'
          }`}
          onClick={toggleDrawer}
        ></div>
        <div
          className={`fixed bg-backgrounds-sub h-[570px] w-full rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 text-center transition-transform duration-300 ease-in-out transform ${
            drawerToggle ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <DrawerContent
            toggleDrawer={toggleDrawer}
            accentCategory={accentCategory}
            handleCategoryListClick={handleCategoryListClick}
          />
        </div>
      </Drawer>
    </>
  );
};

export default ToggleList;
