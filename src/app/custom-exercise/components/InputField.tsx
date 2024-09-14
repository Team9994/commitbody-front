import { Input } from '@/components/ui/input';
import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField = ({ value, onChange, placeholder }: InputFieldProps) => (
  <Input
    value={value}
    onChange={onChange}
    type="text"
    maxLength={50}
    placeholder={placeholder}
    className="w-[320px] h-[52px] px-4 placeholder:text-base placeholder:text-text-placeholder bg-backgrounds-sub text-white rounded-md border border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
    style={{ boxShadow: 'none' }}
  />
);
export default InputField;
