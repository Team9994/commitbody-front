import Header from '@/components/layouts/Header';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function ExerciseListLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header
        className={'bg-backgrounds-default'}
        left={
          <Link href="/">
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </Link>
        }
        center={<h4 className="text-xl font-semibold leading-7 text-text-main">운동 목록</h4>}
        right={
          <Link href="/custom-exercise">
            <Image
              priority
              src={'/assets/routinePlus.svg'}
              alt={'커스텀 운동 추가하기'}
              width={20}
              height={20}
            />
          </Link>
        }
      />
      {children}
    </>
  );
}
