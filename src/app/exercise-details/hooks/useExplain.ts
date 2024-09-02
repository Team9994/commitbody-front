import {
  useCommentDeleteMutation,
  useCommentList,
  useCommentPostLikeMutation,
  useCommentPostMutation,
} from '@/app/api/exercise-details/query';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const useExplain = () => {
  const { data: session } = useSession();
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(undefined);
  const pathname = usePathname();
  const source = 'default';
  const pathSegments = pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { deleteMutation } = useCommentDeleteMutation(id, session, source);
  const { value: content, onChange, reset: contentReset } = useInput();
  const { postCommentMutation } = useCommentPostMutation(id, session, source);
  const { postCommentLikeMutation } = useCommentPostLikeMutation(id, session, source);

  const {
    data: commentLists,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useCommentList(id, session, source);

  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const handleMenuClick = (id: number) => {
    setActiveMenuId(id);
  };

  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setActiveMenuId(undefined);
    }
  };

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
    deleteMutation,
    content,
    onChange,
    postCommentLikeMutation,
    postCommentMutation,
    session,
    contentReset,
    router,
    isFetching,
    id,
  };
};

export default useExplain;
