'use client';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SelectToggle from './components/SelectToggle';
import { COMMUNITY_LIST } from './constant/select';
import CategoryList from './components/CategoryList';
import WriteButton from './components/WriteButton';
import { Drawer } from '@/components/ui/drawer';

const Community = () => {
  const [menuSelected, setMenuSelected] = useState<'certification' | 'question'>('certification');
  const [categorySelected, setCategorySelected] = useState('전체');
  const currentList = COMMUNITY_LIST[menuSelected] as { [key: string]: string };

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const toggleListClick = (label: string) => {
    setCategorySelected(label);
  };

  const handleWriteClick = () => {
    setToggleDrawer((pre) => !pre);
  };

  useEffect(() => {
    setCategorySelected('전체');
    setToggleDrawer(false);
  }, [menuSelected]);

  return (
    <div>
      <Header
        left={<h4 className="text-xl font-semibold leading-7 text-text-main">커뮤니티</h4>}
        right={
          <div className="flex gap-4">
            <Image src={'/assets/search.svg'} alt={'돋보기'} width={28} height={28} />
            <Image src={'/assets/profilePlus.svg'} alt={'친구추가'} width={28} height={28} />
            <Image src={'/assets/bell.svg'} alt={'알림'} width={17} height={21} />
          </div>
        }
        className="relative z-20"
      ></Header>

      <SelectToggle selected={menuSelected} setSelected={setMenuSelected} />

      <div className="flex gap-2 px-5 py-3 overflow-x-scroll scrollbar-hide">
        {Object.keys(currentList).map((key) => {
          const selected = categorySelected === currentList[key];
          return (
            <CategoryList
              key={key}
              label={currentList[key]}
              selected={selected}
              onClick={toggleListClick}
            />
          );
        })}
      </div>

      {menuSelected === 'certification' && (
        <div className="overflow-y-scroll" style={{ height: 'calc(100vh - 217px)' }}>
          <div
            className="grid justify-center"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 118px)',
              gap: '2px',
            }}
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="w-[118px] h-[118px] bg-[#1C1D21] flex items-center justify-center text-white"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}

      {menuSelected === 'question' && (
        <div className="px-5">
          <div className="flex justify-between items-center py-3 border-b border-[black]">
            <div className="flex-grow-1">
              <div className="text-xs w-[37px] rounded-[4px] bg-backgrounds-sub px-2 py-0.5 text-text-light">
                정보
              </div>
              <h4 className="text-bold text-md text-text-main my-2">게시글 제목입니다</h4>
              <div className="flex text-text-light text-[11px]">
                <Image src={'/assets/search.svg'} alt={'돋보기'} width={16} height={16} />
                <span>1</span>
                <Image src={'/assets/speechBubble.svg'} alt={'댓글'} width={16} height={16} />
                <span>2</span>
                <span>1시간 전</span>
                <span>작성자명</span>
              </div>
            </div>
            <div>
              <div className="w-[68px] h-[68px] bg-black"></div>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[black]">
            <div className="flex-grow-1">
              <div className="text-xs w-[37px] rounded-[4px] bg-backgrounds-sub px-2 py-0.5 text-text-light">
                정보
              </div>
              <h4 className="text-bold text-md text-text-main my-2">게시글 제목입니다</h4>
              <div className="flex text-text-light text-[11px]">
                <Image src={'/assets/search.svg'} alt={'돋보기'} width={16} height={16} />
                <span>1</span>
                <Image src={'/assets/speechBubble.svg'} alt={'댓글'} width={16} height={16} />
                <span>2</span>
                <span>1시간 전</span>
                <span>작성자명</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}

      <Drawer open={toggleDrawer} onClose={handleWriteClick}>
        <div
          className={`fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40 transition-opacity duration-300 ${
            toggleDrawer ? 'opacity-70 visible' : 'opacity-0 invisible'
          }`}
          onClick={handleWriteClick}
        ></div>
        <div
          className={`fixed bg-backgrounds-sub h-[250px] w-full rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out transform ${
            toggleDrawer ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="relative">
            <h3 className="text-lg h-16 text-white text-center font-bold py-5 border-b-[1px] border-b-solid border-backgrounds-light">
              게시글 작성
            </h3>
            <Image
              onClick={handleWriteClick}
              className="absolute top-4 right-4 cursor-pointer"
              src="/assets/close.svg"
              width={30}
              height={30}
              alt="닫기"
            />

            <div className="text-white">
              <div className="p-5 border-b-[1px] border-b-solid border-backgrounds-light active:opacity-70 hover:opacity-70">
                <h3 className="pb-2 text-bold text-base">운동 인증</h3>
                <p className="text-text-light text-sm">오늘의 운동을 기록으로 남기고 공유해요</p>
              </div>
              <div className="p-5 active:opacity-70 hover:opacity-70">
                <h3 className="pb-2 text-bold text-base">정보&질문</h3>
                <p className="text-text-light text-sm">운동에 관한 정보를 공유하고 질문해요</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <WriteButton onClick={handleWriteClick} />
    </div>
  );
};

export default Community;
