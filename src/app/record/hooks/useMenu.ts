import { useDeleteRecordMutation } from '@/app/api/record/query';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

const useMenu = () => {
  const { data: session } = useSession();
  const deleteRecordMutation = useDeleteRecordMutation();
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(undefined);
  const [recordToDelete, setRecordToDelete] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (id: number) => {
    setActiveMenuId(id);
  };

  const handleClickOutside = (e: Event) => {
    const isOpen =
      !recordToDelete && menuRef.current && !menuRef.current.contains(e.target as Node);

    if (isOpen) {
      setActiveMenuId(undefined);
    }
  };

  const confirmDelete = () => {
    console.log(`${recordToDelete}가 삭제되었습니다.`);
    deleteRecordMutation.mutate({
      recordId: recordToDelete,
      session,
    });
    setRecordToDelete(undefined);
    setActiveMenuId(undefined);
  };

  useEffect(() => {
    if (activeMenuId === undefined) return;

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId, recordToDelete]);

  return {
    activeMenuId,
    handleMenuClick,
    confirmDelete,
    menuRef,
    setRecordToDelete,
  };
};

export default useMenu;
