'use client';
import { CategoryKey } from '@/constants/exerciseInform';
import useInput from '@/hooks/useInput';
import { useRouter, useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import useRoutineStore from '@/store/routine';

const useExerciseList = () => {
  const router = useRouter();
  const params = useParams();
  const scrollRef = useRef(null);
  const { routines, addRoutine, getRoutineCount, deleteRoutine, selectedExerciseIds } =
    useRoutineStore();

  const { value: searchData, onChange } = useInput('');

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [accentCategory, setAccentCategory] = useState<CategoryKey>('tool');
  const [exerciseList, setExerciseList] = useState(EXERCISE_LIST_DUMMY);
  const mode = params.mode as 'search' | 'routine';

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
    console.log(index);

    if (index !== -1) {
      const updatedList = [...exerciseList];
      updatedList[index].like = !updatedList[index].like;
      console.log(updatedList);
      setExerciseList(updatedList);
    }
  };

  //mode === "routine" 일 경우
  //1.추가하기 버튼 적용하기
  //2.클릭했을때 zustand 운동리스트에 추가하기

  //mode === "search" 일 경우
  //1.클릭했을때 해당 운동으로 넘어가기
  const handleListClick = (exercise: any, mode: 'search' | 'routine') => {
    if (mode === 'search') {
      router.push(`/exercise/${exercise.id}`);
    } else {
      // TODO: zustand에 해당정보 추가하기
      addRoutine(exercise);
      // TODO : 해당 div css 변경하고, 상태칩에 추가하기
    }
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
    mode,
    routines,
    getRoutineCount,
    deleteRoutine,
    selectedExerciseIds,
  };
};

export default useExerciseList;

const EXERCISE_LIST_DUMMY = [
  {
    id: 1,
    image: '/assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 2,
    image: '/assets/exercise_picture.svg',
    name: '시티드 덤벨 프레스',
    like: false,
  },
  {
    id: 3,
    image: '/assets/exercise_picture.svg',
    name: '인클라인 덤벨 프레스',
    like: false,
  },
  {
    id: 4,
    image: '/assets/exercise_picture.svg',
    name: '디클라인 덤벨 프레스',
    like: false,
  },
  {
    id: 5,
    image: '/assets/exercise_picture.svg',
    name: '플라이',
    like: false,
  },
  {
    id: 6,
    image: '/assets/exercise_picture.svg',
    name: '벤치프레스',
    like: false,
  },
  {
    id: 7,
    image: '/assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 8,
    image: '/assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 9,
    image: '/assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 10,
    image: '/assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 11,
    image: '/assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
  {
    id: 12,
    image: '/assets/exercise_picture.svg',
    name: '벤드 체스트 플라이',
    like: false,
  },
];
