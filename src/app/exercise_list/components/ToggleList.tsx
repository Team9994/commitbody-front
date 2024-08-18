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
      {drawerToggle && (
        <Drawer open={drawerToggle} onClose={toggleDrawer}>
          <div
            className="fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40"
            onClick={toggleDrawer}
          ></div>
          <DrawerContent
            toggleDrawer={toggleDrawer}
            accentCategory={accentCategory}
            handleCategoryListClick={handleCategoryListClick}
          />
        </Drawer>
      )}
    </>
  );
};

export default ToggleList;