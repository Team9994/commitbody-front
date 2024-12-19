'use client';
import React from 'react';
import Image from 'next/image';
import { GetDetailsInfoType } from '@/app/api/exercise-details/type';

interface ExerciseInfoProps {
  info: GetDetailsInfoType | undefined;
}

const ExerciseInfo = ({ info }: ExerciseInfoProps) => {
  if (!info) return;
  return (
    <div className="mx-auto px-5">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg leading-[26px] text-text-main mb-1 mt-3">
          {info?.exerciseName}
        </h3>
        <div className="flex align-center">
          <div className="relative flex align-center"></div>
        </div>
      </div>

      <p className="text-sm leading-5 text-text-light mb-4">
        {info?.exerciseTarget} : {info?.exerciseEquipment}
      </p>
      <div className="w-full h-[250px] bg-backgrounds-light mb-2 relative">
        {info?.gifUrl === '등록된 이미지 파일이 없습니다.' ? null : (
          <Image src={info.gifUrl} alt={'운동 이미지'} fill />
        )}
      </div>
    </div>
  );
};

export default ExerciseInfo;
