'use client';

import Image from 'next/image';

type UserInfoType = {
  memberId: number;
  pageType: string;
  nickname: string;
  profile: string;
  followerCount: number;
  followingCount: number;
  blockStatus: boolean;
};

const ProfileEdit = ({ userInfo }: { userInfo: UserInfoType }) => {
  return (
    <div>
      <header className="flex items-center justify-between flex-col">
        <h1 className="text-lg font-normal">프로필 수정</h1>
        <Image
          src={userInfo.profile}
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full"
        />
      </header>
      <form className="space-y-6 flex-grow overflow-y-auto">
        <div className="space-y-2">
          <label htmlFor="nickname" className="text-sm text-gray-400">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            placeholder="기존닉네임"
            className="w-full bg-backgrounds-sub p-3 rounded-md"
          />
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-400">성별</span>
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 p-3 rounded-md">남자</button>
            <button className="flex-1 bg-backgrounds-sub p-3 rounded-md">여자</button>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-400">생년월일</span>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="1999"
              className="flex-1 bg-backgrounds-sub p-2 rounded-md text-sm w-1/2"
            />
            <input
              type="number"
              placeholder="12"
              className=" bg-backgrounds-sub w-1/4 p-2 rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="10"
              className=" bg-backgrounds-sub w-1/4 p-2 rounded-md text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="height" className="text-sm text-gray-400">
              키(cm)
            </label>
            <input
              type="number"
              id="height"
              placeholder="180"
              className="w-full bg-backgrounds-sub p-3 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="weight" className="text-sm text-gray-400">
              몸무게(kg)
            </label>
            <input
              type="number"
              id="weight"
              placeholder="60"
              className="w-full bg-backgrounds-sub p-3 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="muscle" className="text-sm text-gray-400">
              골격근량(kg)
            </label>
            <input
              type="number"
              id="muscle"
              placeholder="20"
              className="w-full bg-backgrounds-sub p-3 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="fat" className="text-sm text-gray-400">
              체지방률(%)
            </label>
            <input
              type="number"
              id="fat"
              placeholder="20"
              className="w-full bg-backgrounds-sub p-3 rounded-md"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
