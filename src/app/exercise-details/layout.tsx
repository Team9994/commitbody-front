'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/layouts/header';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, useState } from 'react';
import Back from '../../components/common/Back';

export default function ExerciseListLayout({ children }: PropsWithChildren<{}>) {
  const [heartToggle, setHeartToggle] = useState(false);

  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];

  const handleHeartToggle = () => {
    setHeartToggle((prev) => !prev);
  };

  return (
    <>
      {lastSegment !== 'edit' && (
        <Header
          className={'bg-backgrounds-default'}
          left={
            <Link href="/">
              <Back />
            </Link>
          }
        />
      )}
      {children}
    </>
  );
}
