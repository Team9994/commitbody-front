import React from 'react';
import { auth } from '@/auth';
import { getUserInfo } from '@/app/api/profile';
import ProfileEdit from './components/ProfileEdit';

export default async function EditPage({ params }: { params: { nickname: string } }) {
  const session = auth();
  const userInfo = await getUserInfo(params.nickname);

  return (
    <div className="bg-backgrounds-default text-white p-5 font-sans min-h-screen flex flex-col">
      <ProfileEdit userInfo={userInfo} />
    </div>
  );
}
