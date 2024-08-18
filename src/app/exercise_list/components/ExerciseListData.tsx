import React, { RefObject } from 'react';
import Image from 'next/image';

interface ExerciseListDataProps {
  handleListClick: (id: number) => void;
  handleLikeToggle: (id: number) => void;
  scrollRef: RefObject<HTMLDivElement>;
  exerciseList: any; // 더미데이터
}

const ExerciseListData = ({
  exerciseList,
  handleListClick,
  handleLikeToggle,
  scrollRef,
}: ExerciseListDataProps) => {
  return (
    <div
      ref={scrollRef}
      className="w-full overflow-y-scroll mt-5"
      style={{ height: 'calc(100vh - 148px)' }}
    >
      {exerciseList.map((list: any) => (
        <div
          key={list.id}
          className="flex items-center w-full h-[76px] border-b border-backgrounds-light cursor-pointer pr-6"
          onClick={() => handleListClick(list.id)}
        >
          <Image src={list.image} alt={list.name} width={76} height={76} />
          <span className="flex-1 ml-4">{list.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLikeToggle(list.id);
            }}
          >
            <Image
              width={24}
              height={24}
              src={list.like ? '/assets/heart_on.svg' : '/assets/heart_off.svg'}
              alt={list.like ? '좋아요' : '좋아요 안 함'}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExerciseListData;
