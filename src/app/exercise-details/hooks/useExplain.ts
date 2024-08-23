import React, { useEffect, useRef, useState } from 'react';

const useExplain = () => {
  const [activeMenuId, setActiveMenuId] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (id: number) => {
    setActiveMenuId(id);
  };

  const handleClickOutside = (e: Event) => {
    const isOpen = menuRef.current && !menuRef.current.contains(e.target as Node);

    if (isOpen) {
      setActiveMenuId(undefined);
    }
  };

  useEffect(() => {
    if (activeMenuId === undefined) return;

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId]);

  return {
    activeMenuId,
    handleMenuClick,
    menuRef,
  };
};

export default useExplain;
