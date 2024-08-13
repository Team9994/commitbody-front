import Header from '@/components/layouts/header';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header
        left={<h1 className="text-[24px] font-semibold leading-[34px] text-[#D9D9D9]">홈</h1>}
        right={<Image src={'/assets/bell.svg'} alt={'알림'} width={16} height={21} />}
      />
      {children}
    </>
  );
}
