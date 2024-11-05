'use client';
import Header from '@/components/layouts/header';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import {
  useLogoutMutation,
  useNotificationMutation,
  useNotificationQuery,
  useWithdrawMutation,
} from '../api/config-setting/query';
import { useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import { AlertDialogHeader } from '@/components/ui';

const Config = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [dialogType, setDialogType] = useState<string | null>(null);
  const { data: notificationData, refetch } = useNotificationQuery({ session });
  const { mutate: notificationMutate } = useNotificationMutation();
  const { mutate: logoutMutate } = useLogoutMutation();
  const { mutate: withdrawMutate } = useWithdrawMutation();
  const openDialog = (type: string) => setDialogType(type);
  const confirmAction = () => {
    if (dialogType === 'logout') {
      logoutMutate({ session });
      alert('로그아웃이 되었습니다.');
    } else if (dialogType === 'withdraw') {
      withdrawMutate({ session });
      alert('회원탈퇴가 되었습니다.');
    }
    setDialogType(null);
    router.push('/sign');
  };

  return (
    <div className="flex flex-col bg-backgrounds-default h-screen text-text-main overflow-hidden">
      <Header
        left={
          <div onClick={() => router.back()}>
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        center={<h4 className="text-xl font-semibold leading-7 text-text-main">설정</h4>}
        right={<div className="opacity-0">무</div>}
        className="relative z-20"
      />

      <div className="p-5 flex justify-between">
        <span className="text-text-main text-lg font-semibold">푸시 알림</span>
        <Switch
          id="airplane-mode"
          checked={notificationData?.data}
          onClick={() => {
            notificationMutate({ session });
          }}
        />
      </div>

      <div className="p-5">
        <h1 className="mb-2 font-semibold">정보</h1>
        <ul className="text-base text-text-main bg-borders-sub">
          <li className="flex justify-between px-4 py-[14px]">
            <span>서비스 이용약관</span>
            <Image
              alt="더보기"
              src="./assets/addButton.svg"
              width={20}
              height={20}
              className="rotate-180 cursor-pointer"
              onClick={() => openDialog('terms')}
            />
          </li>
          <li className="flex justify-between px-4 py-[14px]">
            <span>개인정보 처리방침</span>
            <Image
              alt="더보기"
              src="./assets/addButton.svg"
              width={20}
              height={20}
              className="rotate-180 cursor-pointer"
              onClick={() => openDialog('privacy')}
            />
          </li>
        </ul>
      </div>

      <div className="p-5 mb-[52px]">
        <h1 className="mb-2 font-semibold">계정</h1>
        <ul className="text-base text-text-main bg-borders-sub">
          <li className="flex justify-between px-4 py-[14px]">
            <span>로그아웃</span>
            <Image
              alt="더보기"
              src="./assets/addButton.svg"
              width={20}
              height={20}
              className="rotate-180 cursor-pointer"
              onClick={() => openDialog('logout')}
            />
          </li>
          <li className="flex justify-between px-4 py-[14px]">
            <span>회원 탈퇴</span>
            <Image
              alt="더보기"
              src="./assets/addButton.svg"
              width={20}
              height={20}
              className="rotate-180 cursor-pointer"
              onClick={() => openDialog('withdraw')}
            />
          </li>
        </ul>
      </div>

      <span className="flex justify-center text-text-light text-base">1.0.0</span>

      <AlertDialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)] fixed inset-0" />
        <AlertDialogContent className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-[296px] bg-backgrounds-sub rounded-lg p-6 flex flex-col items-center text-text-main">
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle className="text-lg font-semibold">
                {dialogType === 'logout' && '로그아웃'}
                {dialogType === 'withdraw' && '회원 탈퇴'}
                {dialogType === 'terms' && '서비스 이용약관'}
                {dialogType === 'privacy' && '개인정보 처리방침'}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm mt-2">
                {dialogType === 'logout' && '로그아웃 하시겠습니까?'}
                {dialogType === 'withdraw' && '회원 탈퇴를 진행하시겠습니까?'}
                {dialogType === 'terms' && '여기에 서비스 이용약관 내용을 표시합니다.'}
                {dialogType === 'privacy' && '여기에 개인정보 처리방침 내용을 표시합니다.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center mt-4 space-x-4">
              <AlertDialogCancel className="px-4 py-2 rounded-md">취소</AlertDialogCancel>
              <AlertDialogAction
                className="px-4 py-2 bg-blue-500 text-[#EB4141] rounded-md"
                onClick={confirmAction}
              >
                확인
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Config;
