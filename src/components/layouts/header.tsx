import React from 'react';

interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
  className?: string;
}

const Header = ({ left, right, center, className }: HeaderProps) => {
  return (
    <header
      className={`text-text-main flex items-center justify-between h-12 px-5 py-2.5 ${className || 'bg-backgrounds-sub'}`}
    >
      <div>{left && <div>{left}</div>}</div>
      <div>{center && <div>{center}</div>}</div>
      <div>{right && <div>{right}</div>}</div>
    </header>
  );
};

export default Header;
