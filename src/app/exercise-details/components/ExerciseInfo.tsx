'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDeleteCustomExerciseMutation } from '@/app/api/exercise/query';
import { useRouter } from 'next/navigation';
import { GetDetailsInfoType } from '@/app/api/exercise-details/type';

interface ExerciseInfoProps {
  type: string | null;
  id: string;
  info: GetDetailsInfoType | undefined;
}

const ExerciseInfo = ({ id, type, info }: ExerciseInfoProps) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsActiveMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const { deleteCustomExerciseMutation } = useDeleteCustomExerciseMutation();
  if (!info) return;
  return (
    <div className="mx-auto px-5">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg leading-[26px] text-text-main mb-1 mt-3">
          {info?.exerciseName}
        </h3>
        <div className="flex align-center">
          <div className="relative flex align-center">
            {type === 'custom' && (
              <Image
                priority
                src={'/assets/menu.svg'}
                alt={'메뉴'}
                width={28}
                height={28}
                className="ml-2"
                onClick={() => setIsActiveMenu((pre) => !pre)}
              />
            )}
            {isActiveMenu && (
              <div
                ref={menuRef}
                className="absolute top-0 z-20 right-0 shadow-main bg-backgrounds-light text-md"
              >
                <div
                  onClick={() => {
                    router.push(`/custom-exercise?status=edit&exerciseId=${id}`);
                  }}
                  className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub"
                >
                  수정
                </div>
                <div
                  onClick={() =>
                    deleteCustomExerciseMutation.mutate({
                      id,
                    })
                  }
                  className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                >
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm leading-5 text-text-light mb-4">
        {info?.exerciseTarget} : {info?.exerciseEquipment}
      </p>
      <div className="w-full h-[184px] bg-backgrounds-light mb-2 relative">
        {info?.gifUrl === '등록된 이미지 파일이 없습니다.' ? null : (
          <Image src={info.gifUrl} alt={'운동 이미지'} fill />
        )}
      </div>
    </div>
  );
};

export default ExerciseInfo;
