import React, { useEffect, useRef, useState } from 'react';

const useRoutine = () => {
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(undefined);
  const [routineToDelete, setRoutineToDelete] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (id: number) => {
    setActiveMenuId(id);
  };

  const handleClickOutside = (e: Event) => {
    const isOpen =
      !routineToDelete && menuRef.current && !menuRef.current.contains(e.target as Node);

    if (isOpen) {
      setActiveMenuId(undefined);
    }
  };

  const confirmDelete = () => {
    console.log(`${routineToDelete}가 삭제되었습니다.`);
    setRoutineToDelete(undefined);
    setActiveMenuId(undefined);
  };

  useEffect(() => {
    if (activeMenuId === undefined) return;

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId, routineToDelete]);

  return {
    activeMenuId,
    handleMenuClick,
    confirmDelete,
    menuRef,
    setRoutineToDelete,
  };
};

export default useRoutine;
