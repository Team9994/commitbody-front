'use client';
import { CategoryKey } from '@/app/custom-exercise/constants';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Filters } from '../types';
import { useSearchExercise } from '@/app/api/exercise/query';

const useExerciseList = () => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const { data: session } = useSession();
  const { value: searchData, onChange } = useInput('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [accentCategory, setAccentCategory] = useState<CategoryKey>('tool');

  const [filters, setFilters] = useState<Filters>({
    name: '',
    target: '',
    equipment: '',
    favorite: null,
    source: '',
  });

  const updateFilters = useCallback(() => {
    setFilters({
      name: searchData,
      target: selectedBodyPart,
      equipment: selectedTool,
      favorite: selectedCategory.includes('like') ? true : null,
      source: selectedCategory.includes('custom') ? 'custom' : '',
    });
  }, [searchData, selectedBodyPart, selectedTool, selectedCategory]);

  useEffect(() => {
    updateFilters();
  }, [selectedCategory, updateFilters]);

  const toggleDrawer = useCallback(() => {
    setDrawerToggle((prev) => !prev);
  }, []);

  const handleCategoryClick = useCallback(
    (categoryKey: CategoryKey, hasItems: boolean) => {
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
    },
    [toggleDrawer]
  );

  const handleCategoryListClick = useCallback(
    (key: string, itemLabel: string) => {
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
    },
    [toggleDrawer]
  );

  const handleListClick = (id: number, type: string) => {
    const queryParam = type === 'custom' ? 'custom' : 'default';

    router.push(`/exercise-details/${id}?type=${queryParam}`);
  };

  const {
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useSearchExercise(filters, session);

  useEffect(() => {
    refetch();
  }, [filters]);

  const observerRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { rootMargin: '50px', threshold: 0 }
  );

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
    scrollRef,
    observerRef,
    searchResults,
    filters,
  };
};

export default useExerciseList;
