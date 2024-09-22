import Footer from '@/components/layouts/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function ExerciseListLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen bg-backgrounds-default">
      {children}
      <Footer />
    </div>
  );
}
