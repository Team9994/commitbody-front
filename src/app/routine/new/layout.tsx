import Footer from '@/components/layouts/Footer';
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
        right={<div className='text-base text-blue font-semibold'>저장</div>}
      />
      {children}
    </>
  );
}
