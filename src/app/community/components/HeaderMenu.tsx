'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface HeaderMenuProps {
  id: string;
}

const HeaderMenu = ({ id }: HeaderMenuProps) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [routineToDelete, setRoutineToDelete] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  console.log(id);

  const handleClickOutside = (e: Event) => {
    const isOpen =
      !routineToDelete && menuRef.current && !menuRef.current.contains(e.target as Node);

    if (isOpen) {
      setActiveMenu(false);
    }
  };

  const confirmDelete = () => {
    console.log(`${routineToDelete}가 삭제되었습니다.`);
    setRoutineToDelete(false);
    setActiveMenu(false);
  };

  useEffect(() => {
    if (activeMenu === false) return;

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu, routineToDelete]);

  return (
    <div>
      <Image
        onClick={() => setActiveMenu((pre) => !pre)}
        src="/assets/menu.svg"
        alt="메뉴"
        width={24}
        height={24}
        className="rotate-90"
      />
      {activeMenu && (
        <div
          ref={menuRef}
          className="absolute top-[calc(50%-12px)] z-10 right-5 shadow-main bg-backgrounds-light text-md"
        >
          <div className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub">
            수정
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                onClick={() => {
                  setRoutineToDelete(true);
                }}
                className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
              >
                삭제
              </div>
            </AlertDialogTrigger>
            <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
            <AlertDialogContent className="w-[296px] h-[148px] bg-backgrounds-sub rounded-6 p-0 flex flex-col items-center text-text-main border-none">
              <AlertDialogHeader className="text-center">
                <AlertDialogTitle className="text-lg py-[19px] pb-[11px] font-semibold leading-[26px]">
                  루틴 삭제
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm font-normal leading-5 text-text-main">
                  해당 루틴을 삭제할까요?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex items-center h-12">
                <AlertDialogCancel
                  className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-light text-center cursor-pointer border-none
      focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                  onClick={() => {
                    setActiveMenu(false);
                    setRoutineToDelete(false);
                  }}
                >
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-accent text-center cursor-pointer border-none
      focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                  onClick={confirmDelete}
                >
                  삭제
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
