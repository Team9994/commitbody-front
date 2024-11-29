'use client';
import React, { useState } from 'react';
import ExerciseInfo from '../components/ExerciseInfo';
import SelectToggle from '../components/SelectToggle';
import Comment from '../components/Comment';
import Record from '../components/Record';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDetailsInfo } from '@/app/api/exercise-details/query';
import { useSession } from 'next-auth/react';
import Header from '@/components/layouts/Header';
import Link from 'next/link';
import Back from '@/components/common/Back';
import Image from 'next/image';
import { useDetailLikeRegister, useLikeRegister } from '@/app/api/exercise/query';

const ExerciseDetails = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [selected, setSelected] = useState<'explain' | 'record'>(
    type === 'default' ? 'explain' : 'record'
  );

  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  const { data: session } = useSession();
  const { postDetailLikeRegisterMutation } = useDetailLikeRegister();

  const { data } = useDetailsInfo({ id: lastSegment, source: 'default', session });

  console.log(data);
  const handleHeartChange = () => {
    postDetailLikeRegisterMutation.mutate({
      exerciseId: Number(lastSegment),
      source: type as 'custom' | 'default',
      session,
    });
  };

  return (
    <div>
      {lastSegment !== 'edit' && (
        <Header
          className={'bg-backgrounds-default'}
          left={
            <Link href="/">
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
                <Image
                  onClick={handleHeartChange}
                  priority
                  src={'/assets/menu.svg'}
                  alt={'찜하기'}
                  width={28}
                  height={28}
                  className="ml-4 rotate-90"
                />
              )}
            </div>
          }
        />
      )}
      <ExerciseInfo id={lastSegment} type={type} info={data?.data} />
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
            <div className="leading-[18px] text-blue">동영상 보러 가기 </div>
          </div>
          <Comment />
        </div>
      )}
      {selected === 'record' && <Record info={data?.data} />}
    </div>
  );
};

export default ExerciseDetails;
