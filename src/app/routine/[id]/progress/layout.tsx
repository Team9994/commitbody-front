import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header
        left={<h1 className="text-2xl font-semibold leading-[34px] text-text-main">홈</h1>}
        right={<Image src={'/assets/bell.svg'} alt={'알림'} width={17} height={21} />}
      />
      {children}
      <Footer />
    </>
  );
}
