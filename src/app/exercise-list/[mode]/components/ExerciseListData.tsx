import React, { RefObject } from 'react';
import Image from 'next/image';
import { useLikeRegister } from '@/app/api/exercise/query';
import { Exercise_list, Filters } from '@/app/exercise-list/types';

interface ExerciseListDataProps {
  handleListClick: (
    gif: string,
    id: number,
    type: string,
    name: string,
    mode: 'search' | 'routine'
  ) => void;
  scrollRef: RefObject<HTMLDivElement>;
  mode: 'search' | 'routine';
  selectedExerciseIds: Set<number>;
  observerRef: RefObject<HTMLDivElement>;
  searchResults: Exercise_list[];
  filters: Filters;
}

const ExerciseListData = ({
  searchResults,
  handleListClick,
  scrollRef,
  mode,
  selectedExerciseIds,
  observerRef,
  filters,
}: ExerciseListDataProps) => {
  const mutation = useLikeRegister(filters);
  return (
    <div
      ref={scrollRef}
      className="w-full overflow-y-scroll mt-5"
      style={{ height: 'calc(100vh - 148px - 20px)' }}
    >
      {searchResults.length === 0 && (
        <p className="text-center mt-10 text-main">검색 결과가 없습니다.</p>
      )}
      {searchResults.map((list) => (
        <div
          key={list.exerciseId}
          className={`flex items-center w-full h-[76px] border-b border-backgrounds-light cursor-pointer pr-6 ${
            selectedExerciseIds.has(list.exerciseId) && 'bg-backgrounds-light'
          }`}
          onClick={() =>
            handleListClick(list.gifUrl, list.exerciseId, list.source, list.exerciseName, mode)
          }
        >
          {list.gifUrl === '등록된 이미지 파일이 없습니다.' ? null : (
            <Image src={list.gifUrl} alt={'운동 이미지'} width={76} height={76} />
          )}
          <span className="flex-1 ml-4">{list.exerciseName}</span>
          <Image
            onClick={(e) => {
              e.stopPropagation();
              mutation.mutate({
                exerciseId: list.exerciseId,
                source: list.source,
              });
            }}
            width={24}
            height={24}
            src={list.interest ? '/assets/heart_on.svg' : '/assets/heart_off.svg'}
            alt={list.interest ? '좋아요' : '좋아요 안 함'}
          />
        </div>
      ))}
      <div ref={observerRef} className="h-10 w-40" />
    </div>
  );
};

export default ExerciseListData;
