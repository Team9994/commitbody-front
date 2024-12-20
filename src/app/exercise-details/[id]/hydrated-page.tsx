'use client';
import React, { useEffect, useRef, useState } from 'react';
import ExerciseInfo from '../components/ExerciseInfo';
import SelectToggle from '../components/SelectToggle';
import Comment from '../components/Comment';
import Record from '../components/Record';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDetailsInfo } from '@/app/api/exercise-details/query';
import Header from '@/components/layouts/Header';
import Link from 'next/link';
import Back from '@/components/common/Back';
import Image from 'next/image';
import { useDeleteCustomExerciseMutation, useDetailLikeRegister } from '@/app/api/exercise/query';

const ExerciseDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [selected, setSelected] = useState<'explain' | 'record'>(
    type === 'default' ? 'explain' : 'record'
  );
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  const { deleteCustomExerciseMutation } = useDeleteCustomExerciseMutation();
  const { postDetailLikeRegisterMutation } = useDetailLikeRegister();

  const { data } = useDetailsInfo({ id: lastSegment, source: 'default' });

  const handleHeartChange = () => {
    postDetailLikeRegisterMutation.mutate({
      exerciseId: Number(lastSegment),
      source: type as 'custom' | 'default',
    });
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

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
  return (
    <div>
      {lastSegment !== 'edit' && (
        <Header
          className={'bg-backgrounds-default'}
          left={
            <Link href="/exercise-list/search">
              <Back />
            </Link>
          }
          center={<div></div>}
          right={
            <div className="flex">
              <Image
                onClick={handleHeartChange}
                priority
                src={data?.data?.interestStatus ? '/assets/heart_on.svg' : '/assets/heart_off.svg'}
                alt={'찜하기'}
                width={24}
                height={24}
              />
              {type === 'custom' && (
                <div className="relative">
                  <Image
                    priority
                    src={'/assets/menu.svg'}
                    alt={'메뉴'}
                    width={28}
                    height={28}
                    className="ml-4 rotate-90"
                    onClick={() => setIsActiveMenu((pre) => !pre)}
                  />
                  {isActiveMenu && (
                    <div
                      ref={menuRef}
                      className="absolute top-0 z-20 right-0 shadow-main bg-backgrounds-light text-md"
                    >
                      <div
                        onClick={() => {
                          router.push(
                            `/custom-exercise?status=edit&exerciseId=${data?.data?.exerciseId}`
                          );
                        }}
                        className="cursor-pointer w-[152px] h-[46px] text-text-main p-3 border-b border-borders-sub"
                      >
                        수정
                      </div>
                      <div
                        onClick={() =>
                          deleteCustomExerciseMutation.mutate({
                            id: String(data?.data?.exerciseId),
                          })
                        }
                        className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                      >
                        삭제
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        />
      )}
      <ExerciseInfo info={data?.data} />
      <SelectToggle type={type} selected={selected} setSelected={setSelected} />
      {type === 'default' && selected === 'explain' && (
        <div className="w-full px-5 mt-4 mb-10">
          <h4 className="text-lg text-text-main font-bold mb-2">운동 순서</h4>
          {data?.data?.exerciseMethods.map((order, index) => {
            return (
              <p key={index} className="mb-2 text-s">
                {index + 1}. {order}
              </p>
            );
          })}
          <div className="w-[320px] h-[40px] rounded-6 border border-backgrounds-light text-s flex justify-between items-center px-4 mb-10 mt-5">
            <div className="leading-[18px] text-text-main ">더 자세한 동작을 알고싶다면?</div>
            <Link
              href={`https://www.youtube.com/results?search_query=${data?.data?.exerciseName}`}
              className="cursor-pointer leading-[18px] text-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              동영상 보러 가기
            </Link>
          </div>
          <Comment />
        </div>
      )}
      {selected === 'record' && <Record info={data?.data} />}
    </div>
  );
};

export default ExerciseDetails;
