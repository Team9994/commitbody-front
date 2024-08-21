'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function SocialButton(props: { type: 'google' | 'kakao' }) {
  const handleSignIn = async () => {
    try {
      await signIn(props.type, {
        callbackUrl: `http://localhost:3000/sign/additional-info`,
      });
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };
  return (
    <div
      className={`flex justify-center rounded-[6px] h-13 items-center text-base font-medium leading-6 ${props.type === 'google' ? 'bg-[#FFFFFF]' : 'bg-[#FEE500]'}`}
      onClick={handleSignIn}
    >
      <Image
        src={`/assets/icon/${props.type}Icon.svg`}
        alt={props.type === 'google' ? '구글 로그인' : '카카오 로그인'}
        width={18}
        height={16.8}
        className="mr-4"
      />
      <span className="text-base font-medium leading-6">
        {props.type === 'google' ? '구글 로그인' : '카카오 로그인'}
      </span>
    </div>
  );
}
