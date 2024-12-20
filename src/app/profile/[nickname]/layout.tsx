'use client';
import Footer from '@/components/layouts/Footer';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div className="min-h-screen bg-backgrounds-default">
        {children}
        <Footer />
      </div>
    </>
  );
}
