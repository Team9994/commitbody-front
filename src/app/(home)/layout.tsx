import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header
        left={<Image src={'/assets/logo.svg'} alt={'로고'} width={138} height={24} />}
        right={
          <Link href={'./alarm'}>
            <Image src={'/assets/bell.svg'} alt={'알림'} width={17} height={21} />
          </Link>
        }
        className="relative z-20"
      />
      {children}
      <Footer />
    </>
  );
}
