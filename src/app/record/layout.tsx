import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export default function RecordLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header
        left={<h4 className="font-bold text-2xl leading-[34px]">기록</h4>}
        right={<Image src={'/assets/bell.svg'} alt={'알림'} width={17} height={21} />}
        className="bg-backgrounds-default"
      />
      {children}
      <Footer />
    </>
  );
}
