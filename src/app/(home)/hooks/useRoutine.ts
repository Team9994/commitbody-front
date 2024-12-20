import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteRoutineMutation } from '@/app/api/routine/query';

const useRoutine = () => {
  const { deleteRoutineMutation } = useDeleteRoutineMutation();
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(undefined);
  const [routineToDelete, setRoutineToDelete] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const router = useRouter();
  const toggleDrawer = (index?: number) => {
    setDrawerToggle((prev) => !prev);
    if (index !== undefined) {
      setSelectedId(index);
    }
  };

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

  const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (routineToDelete) {
      deleteRoutineMutation.mutate(String(routineToDelete));
      window.location.reload();
      setRoutineToDelete(undefined);
      setActiveMenuId(undefined);
    }
  };

  const moveRouter = (id: number, type: string) => {
    if (type === 'edit') {
      console.log('move' + id);
      router.push(`/routine/${id}/edit`);
    } else if (type === 'progress') {
      router.push(`/routine/${id}/progress`);
    }
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
    drawerToggle,
    toggleDrawer,
    selectedId,
    moveRouter,
  };
};

export default useRoutine;
