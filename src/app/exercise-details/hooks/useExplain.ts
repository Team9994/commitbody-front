import { getComment } from '@/app/api/exercise-comment';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

const useExplain = (id: string, source: 'custom' | 'default') => {
  const { data: session } = useSession();
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (id: number) => {
    setActiveMenuId(id);
  };

  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setActiveMenuId(undefined);
    }
  };

  const {
    data: commentLists,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['get_comment', id, session, source],
    queryFn: ({ pageParam = { lastId: null, size: 10 } }) =>
      getComment({
        session,
        id,
        source,
        lastId: pageParam.lastId,
        size: pageParam.size,
      }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: { lastId: null, size: 10 },

    getNextPageParam: (lastPage) => {
      const lastComment = lastPage?.data?.commentList?.[lastPage.data.commentList.length - 1];
      const nextLastId = lastComment ? lastComment.exerciseCommentId : null;
      return lastPage?.data?.hasNext ? { lastId: nextLastId, size: 10 } : undefined;
    },
    enabled: true,
  });
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId]);

  return {
    activeMenuId,
    handleMenuClick,
    menuRef,
    observerRef,
    commentLists,
    isLoading,
  };
};

export default useExplain;
