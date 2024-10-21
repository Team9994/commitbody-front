import Image from 'next/image';

const UserInfo = () => {
  return (
    <div className="flex items-center justify-between h-[104px] px-4 ">
      <div className="flex items-center space-x-3">
        <Image
          src="/assets/heart_on.svg"
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">이름</h2>
          <p className="text-sm text-gray-600">팔로워 1 · 팔로잉 2</p>
        </div>
      </div>
      <button className="px-4 py-2 text-text-light bg-backgrounds-sub rounded-md">
        프로필 수정
      </button>
    </div>
  );
};

export default UserInfo;
