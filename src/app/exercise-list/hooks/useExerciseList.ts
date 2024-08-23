'use client';
import { CategoryKey } from '@/constants/exerciseInform';
import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const useExerciseList = () => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const { value: searchData, onChange } = useInput('');

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [accentCategory, setAccentCategory] = useState<CategoryKey>('tool');
  const [exerciseList, setExerciseList] = useState(EXERCISE_LIST_DUMMY);
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

  const handleLikeToggle = (id: number) => {
    const index = exerciseList.findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedList = [...exerciseList];
      updatedList[index].like = !updatedList[index].like;
      setExerciseList(updatedList);
    }
  };

  const handleListClick = (id: number) => {
    router.push(`/exercise-details/${id}`);
  };

  return {
    selectedCategory,
    selectedTool,
    selectedBodyPart,
    drawerToggle,
    accentCategory,
    searchData,
    onChange,
    toggleDrawer,
    handleCategoryClick,
    handleCategoryListClick,
    handleListClick,
    handleLikeToggle,
    exerciseList,
    scrollRef,
  };
};

export default useExerciseList;

const EXERCISE_LIST_DUMMY = [
  {
    id: 1,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 2,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 3,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 4,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 5,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 6,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 7,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 8,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 9,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 10,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 11,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 12,
    image: './assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
];
