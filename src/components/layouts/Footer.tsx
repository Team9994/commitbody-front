'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const currentPath = window.location.pathname;

  return (
    <nav className="bg-[#292C33] font-medium fixed bottom-0 left-0 right-0 h-[58px] text-[10px] rounded-t-[16px]">
      <ul className="flex justify-around h-full items-center">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <li key={item.href} className="flex flex-col items-center">
              <Image
                src={item.icon}
                width={28}
                height={28}
                alt={item.label}
                style={{
                  filter: isActive
                    ? 'invert(38%) sepia(81%) saturate(3456%) hue-rotate(185deg) brightness(99%) contrast(101%)'
                    : 'none',
                }}
              />
              <Link
                href={item.href}
                className={`leading-[16px] text-center ${
                  isActive ? 'text-[#198DF7]' : 'text-[#787B82]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Footer;

// TODO : 나중에 경로 수정
const navItems = [
  { href: '/', label: '홈', icon: '/assets/home.svg' },
  { href: '/record', label: '기록', icon: '/assets/callander.svg' },
  { href: '/community', label: '커뮤니티', icon: '/assets/community.svg' },
  { href: '/my', label: 'MY', icon: '/assets/my.svg' },
];
