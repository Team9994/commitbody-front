import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useDeleteCustomExerciseMutation } from '@/app/api/exercise/query';
import { useSession } from 'next-auth/react';

interface ExerciseInfoProps {
  type: string | null;
  id: string;
}

const ExerciseInfo = ({ id, type }: ExerciseInfoProps) => {
  const { data: session } = useSession();
  const heartToggle = true;
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
  return (
    <div className="mx-auto px-5">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg leading-[26px] text-text-main mb-1 mt-3">
          덤벨 라잉 외회전 숄더 로테이션
        </h3>
        <div className="flex align-center">
          {type === 'default' && (
            <Image
              priority
              src={heartToggle ? '/assets/heart_on.svg' : '/assets/heart_off.svg'}
              alt={'찜하기'}
              width={24}
              height={24}
            />
          )}

          <div className="relative">
            {type === 'custom' && (
              <Image
                priority
                src={'/assets/menu.svg'}
                alt={'메뉴'}
                width={28}
                height={28}
                className="rotate-90 ml-2"
                onClick={() => setIsActiveMenu((pre) => !pre)}
              />
            )}
            {isActiveMenu && (
              <div
                ref={menuRef}
                className="absolute top-0 z-10 right-0 shadow-main bg-backgrounds-light text-md"
              >
                <div
                  onClick={() => {}}
                  className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub"
                >
                  수정
                </div>
                <div
                  onClick={() =>
                    deleteCustomExerciseMutation.mutate({
                      session,
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

      <p className="text-sm leading-5 text-text-light mb-4">가슴 : 스미스머신</p>
      <div className="w-full h-[184px] bg-backgrounds-light mb-4 relative">
        {type === 'custom' && (
          <Image
            className="absolute top-1 right-1 z-10"
            priority
            src={heartToggle ? '/assets/heart_on.svg' : '/assets/heart_off.svg'}
            alt={'찜하기'}
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseInfo;
