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
import React from 'react';
import useRoutine from '../hooks/useRoutine';
import { Drawer } from '@/components/ui/drawer';
import DrawerContent from './DrawerContent';
import { RoutineDto } from '@/app/(home)/types';
import Link from 'next/link';

const RoutineList = ({ routineList }: { routineList: RoutineDto[] }) => {
  const {
    menuRef,
    setRoutineToDelete,
    activeMenuId,
    handleMenuClick,
    confirmDelete,
    drawerToggle,
    toggleDrawer,
    selectedId,
    moveRouter,
  } = useRoutine();
  console.log(routineList[0]);
  return (
    <>
      <div>
        <div className="overflow-y-scroll max-h-[535px]">
          {routineList?.length > 0 &&
            routineList
              ?.slice()
              .reverse()
              .map((data) => (
                <div
                  className="bg-backgrounds-sub rounded-6 h-[76px] box-border mb-3 mx-5 p-4 text-text-main relative"
                  key={data.routineId}
                  onClick={() => toggleDrawer(data.routineId)}
                >
                  <p className="text-md leading-[22px]">{data.routineName}</p>

                  {data.targets.map((part) => (
                    <span className="text-xs leading-[18px] text-text-light mr-1.5" key={part}>
                      {part}
                    </span>
                  ))}
                  <Image
                    onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                      e.stopPropagation();
                      handleMenuClick(data.routineId);
                    }}
                    src={'/assets/menu.svg'}
                    alt="메뉴"
                    width={24}
                    height={24}
                    className="absolute top-1/2 right-5 transform -translate-y-1/2 rotate-90 cursor-pointer"
                  />
                  {activeMenuId === data.routineId && (
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
                            className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                            onClick={() => setRoutineToDelete(data.routineId)}
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
                              onClick={() => setRoutineToDelete(undefined)}
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
              ))}
        </div>

        <Link
          href="./routine/new"
          className="flex items-center hover:cursor-pointer bg-backgrounds-sub rounded-6 h-[76px] box-border mb-3 mx-5 p-4 text-text-main relative border-[1px] border-dashed border-borders-main"
        >
          <p className="text-md leading-[22px] text-text-light">새로운 루틴을 추가해보세요</p>

          <Image
            src={'/assets/plus.svg'}
            alt="추가하기"
            width={14}
            height={14}
            className="absolute top-1/2 right-5 transform -translate-y-1/2 rotate-90"
          />
        </Link>
        <Drawer open={drawerToggle} onClose={() => toggleDrawer(selectedId)}>
          <div
            className={`fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40 transition-opacity duration-300 ${
              drawerToggle ? 'opacity-70 visible' : 'opacity-0 invisible'
            }`}
            onClick={() => toggleDrawer(selectedId)}
          ></div>
          <div
            className={`fixed bg-backgrounds-sub max-h-[480px] max-w-[500px] w-full mx-auto rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 text-center transition-transform duration-300 ease-in-out transform ${
              drawerToggle ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {routineList?.length > 0 && selectedId !== undefined && (
              <DrawerContent
                toggleDrawer={toggleDrawer}
                routineData={routineList.filter((item) => item.routineId === selectedId)[0]}
                selectedId={selectedId}
                moveRouter={moveRouter}
              />
            )}
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default RoutineList;
