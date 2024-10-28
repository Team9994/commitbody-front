'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
  className?: string;
  onLeftClick?: string;
  onRightClick?: () => void;
}

const Header = ({ left, right, center, className, onLeftClick, onRightClick }: HeaderProps) => {
  const router = useRouter();
  return (
    <header
      className={`text-text-main flex items-center justify-between h-12 px-5 py-2.5  ${className || 'bg-backgrounds-sub'}`}
    >
      <div onClick={onLeftClick === 'back' ? () => router.back() : undefined} role="button">
        {left && <div>{left}</div>}
      </div>
      <div>{center && <div>{center}</div>}</div>
      <div onClick={onRightClick} role="button">
        {right && <div>{right}</div>}
      </div>
    </header>
  );
};

export default Header;
