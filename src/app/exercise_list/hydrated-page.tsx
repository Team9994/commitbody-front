'use client';
import React, { useState } from 'react';
import Search from './components/Search';
import useInput from '@/hooks/useInput';
import EXERCISE_LIST, { CategoryKey } from '@/constants/exerciseInform';
import { Drawer } from '@/components/ui/drawer';
import CategoryItem from './components/CategoryItem';
import DrawerContent from './components/DrawerContent';

const ExerciseList = () => {
  const { value: searchData, onChange } = useInput('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [accentCategory, setAccentCategory] = useState<CategoryKey>('tool');

  const toggleDrawer = () => {
    setDrawerToggle((prev) => !prev);
  };

  const handleCategoryClick = (categoryKey: CategoryKey, hasItems: boolean) => {
    if (hasItems) {
      setAccentCategory(categoryKey);
      toggleDrawer();
      return;
    }

    setSelectedCategory((prev) =>
      prev.includes(categoryKey)
        ? prev.filter((item) => item !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const handleCategoryListClick = (key: string, itemLabel: string) => {
    const isAllSelected = itemLabel === '전체';

    const updateSelectedCategory = (key: string) => {
      setSelectedCategory((prev) =>
        prev.includes(key) ? prev.filter((item) => item !== key) : prev
      );
    };

    const clearSelection = (key: string) => {
      if (key === 'tool') setSelectedTool('');
      if (key === 'bodyPart') setSelectedBodyPart('');
      updateSelectedCategory(key);
    };

    const selectItem = (key: string, itemLabel: string) => {
      if (key === 'tool') setSelectedTool(itemLabel);
      if (key === 'bodyPart') setSelectedBodyPart(itemLabel);
      setSelectedCategory((prev) => [...prev, key]);
    };

    if (isAllSelected) {
      clearSelection(key);
    } else {
      selectItem(key, itemLabel);
    }

    toggleDrawer();
  };
  return (
    <div>
      <Search searchData={searchData} />
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
    </div>
  );
};

export default ExerciseList;
