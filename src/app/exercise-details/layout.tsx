'use client';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, useState } from 'react';
import Back from '../../components/common/Back';

export default function ExerciseListLayout({ children }: PropsWithChildren<{}>) {
  const [heartToggle, setHeartToggle] = useState(false);

  const hanldeHeartToggle = () => {
    setHeartToggle((pre) => !pre);
  };
  return (
    <>
      <Header
        className={'bg-backgrounds-default'}
        left={
          <Link href="/">
            <Back />
          </Link>
        }
        right={
          <Image
            onClick={hanldeHeartToggle}
            priority
            src={heartToggle ? '/assets/heart_on.svg' : '/assets/heart_off.svg'}
            alt={'찜하기'}
            width={24}
            height={24}
          />
        }
      />
      {children}
    </>
  );
}
