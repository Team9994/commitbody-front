import Image from 'next/image';
import React from 'react';

interface WriteButtonProps {
  onClick: () => void;
}

const WriteButton = ({ onClick }: WriteButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="absolute bottom-20 right-5 w-[56px] h-[56px] rounded-16 bg-blue flex justify-center items-center"
    >
      <Image src="/assets/pencil.svg" alt="글쓰기 버튼" width={24} height={24} />
    </div>
  );
};

export default WriteButton;
