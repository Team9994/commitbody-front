'use client';
import { getSearchExercise } from '@/app/api/exercise';
import { CategoryKey } from '@/constants/exerciseInform';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useInput from '@/hooks/useInput';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';

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

  //TODO : favorite 부분 백엔드에게 어떤 양식인지 질문하기
  const [filters, setFilters] = useState({
    name: '',
    target: '',
    equipment: '',
    favorite: false,
    source: '',
  });

  const updateFilters = useCallback(() => {
    setFilters({
      name: searchData,
      target: selectedBodyPart,
      equipment: selectedTool,
      favorite: selectedCategory.includes('like') ? true : false,
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

  const handleListClick = useCallback(
    (id: number) => {
      router.push(`/exercise-details/${id}`);
    },
    [router]
  );

  const {
    data: searchResults,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['Search_Result', filters],
    queryFn: ({ pageParam = { from: 0, size: 20 } }) =>
      getSearchExercise(session, filters, pageParam.size, pageParam.from),
    staleTime: 1000 * 60 * 60,
    initialPageParam: { from: 0, size: 20 },

    getNextPageParam: (_lastPage, allPages) => {
      const nextFrom = allPages.length * 20;
      return allPages[allPages.length - 1].length === 20 ? { from: nextFrom, size: 20 } : undefined;
    },
    enabled: false,
  });

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
