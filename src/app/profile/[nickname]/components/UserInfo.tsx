import Image from 'next/image';
import { useRouter } from 'next/navigation';

// UserInfo 타입 선언
type UserInfoType = {
  memberId: number;
  pageType: string;
  nickname: string;
  profile: string;
  followerCount: number;
  followingCount: number;
  blockStatus: boolean;
};

const UserInfo = ({ userInfo }: { userInfo: UserInfoType }) => {
  const router = useRouter();
  const handleEditProfile = () => {
    router.push(`${window.location.pathname}/edit`);
  };
  return (
    <div className="flex items-center justify-between h-[104px] px-4 ">
      <div className="flex items-center space-x-3">
        <Image
          src={userInfo?.profile}
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">{userInfo?.nickname}</h2>
          <p className="text-sm text-gray-600">
            팔로워 {userInfo?.followerCount} · 팔로잉 {userInfo?.followingCount}
          </p>
        </div>
      </div>
      {/* <button
        className="px-4 py-2 text-text-light bg-backgrounds-sub rounded-md"
        onClick={handleEditProfile}
      >
        프로필 수정
      </button> */}
    </div>
  );
};

export default UserInfo;
