'use client';
import React, { useEffect, useState } from 'react';
import { getUserInfo } from '@/app/api/profile';
import ProfileEdit from './components/ProfileEdit';

export default function EditPage({ params }: { params: { nickname: string } }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getUserInfo(params.nickname);
      setUserInfo(data);
    })();
  }, []);

  return (
    <div className="bg-backgrounds-default text-white px-5 font-sans min-h-screen flex flex-col">
      <ProfileEdit userInfo={userInfo} />
    </div>
  );
}
