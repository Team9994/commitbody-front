'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { getFCMToken } from '@/lib/firebase';

export default function SocialButton(props: { type: 'google' | 'kakao' }) {
  const handleSignIn = async () => {
    try {
      console.log('FCM 토큰 발급 시작');
      const fcmToken = await getFCMToken();
      console.log('발급된 FCM 토큰:', fcmToken);

      if (!fcmToken) {
        console.log('FCM 토큰 발급 실패');
      }

      // FCM 토큰을 먼저 서버에 전송
      await fetch('/api/auth/fcm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fcmToken }),
      });

      // 그 다음 소셜 로그인 진행
      await signIn(props.type, {
        callbackUrl: 'http://localhost:3000/',
      });
    } catch (error) {
      console.error('로그인 처리 중 상세 오류:', error);
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
