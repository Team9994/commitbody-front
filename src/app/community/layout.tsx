'use client';
import Footer from '@/components/layouts/Footer';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function CommunityLayout({ children }: PropsWithChildren<{}>) {
  const path = usePathname();

  if (path.startsWith('/community/writePost') || /\d+$/.test(path)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-backgrounds-default">
      {children}
      <Footer />
    </div>
  );
}
