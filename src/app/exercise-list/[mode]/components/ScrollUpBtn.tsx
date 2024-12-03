import React, { RefObject } from 'react';
import Image from 'next/image';

interface ScrollUpBtnProps {
  scrollRef: RefObject<HTMLDivElement>;
  mode: 'search' | 'routine';
}

const ScrollUpBtn = ({ scrollRef, mode }: ScrollUpBtnProps) => {
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      onClick={scrollToTop}
      className={`fixed ml-5 bg-black shadow-lg shadow-black/40 z-90 rounded-[16px] w-14 h-14 flex items-center justify-center cursor-pointer ${
        mode === 'search' ? 'bottom-16' : 'bottom-[140px]'
      }`}
    >
      <Image
        src="/assets/back.svg"
        alt="Scroll to top"
        width={24}
        height={24}
        className="transform rotate-90"
      />
    </div>
  );
};

export default ScrollUpBtn;
