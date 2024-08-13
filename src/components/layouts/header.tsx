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
      className={`bg-[#292C33] text-[#D9D9D9] flex items-center justify-between h-12 px-[20px] py-[10px] ${className}`}
    >
      <div>{left && <div>{left}</div>}</div>
      <div>{center && <div>{center}</div>}</div>
      <div>{right && <div>{right}</div>}</div>
    </header>
  );
};

export default Header;
