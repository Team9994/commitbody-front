import { Button } from '@/components/ui/button';
import React from 'react';

interface SubmitButtonProps {
  isDisabled: boolean;
  onClick: () => void;
  status: string | null;
}

const SubmitButton = ({ status, isDisabled, onClick }: SubmitButtonProps) => (
  <Button
    disabled={isDisabled}
    onClick={onClick}
    className={`w-[320px] h-[52px] absolute bottom-4 font-bold text-base rounded-6 ${
      isDisabled
        ? 'bg-gray-500 text-gray-400 cursor-not-allowed'
        : 'bg-blue text-white cursor-pointer'
    }`}
  >
    {status ? '수정하기' : '추가하기'}
  </Button>
);

export default SubmitButton;
