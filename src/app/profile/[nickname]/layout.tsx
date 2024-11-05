import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div className="min-h-screen bg-backgrounds-default">
        <Header
          left={<Image src={'/assets/back.svg'} alt={'로고'} width={24} height={24} />}
          right={<Image src={'/assets/bell.svg'} alt={'알림'} width={17} height={21} />}
          className="relative z-20"
          onLeftClick="back"
        />
        {children}
        <Footer />
      </div>
    </>
  );
}
