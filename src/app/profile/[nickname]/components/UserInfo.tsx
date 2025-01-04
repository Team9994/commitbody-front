import Image from 'next/image';
import { useRouter } from 'next/navigation';

// UserInfo 타입 선언
interface MemberDto {
  birthday: string;
  bodyFatPercentage: number;
  boneMineralDensity: number;
  gender: 'MALE' | 'FEMALE';
  height: string;
  memberId: number;
  nickname: string;
  profile: string;
  weight: string;
}

export interface UserProfile {
  blockStatus: boolean;
  followerCount: number;
  followingCount: number;
  memberDto: MemberDto;
  pageType: 'myPage' | string;
}
const UserInfo = ({ userInfo }: { userInfo: UserProfile }) => {
  const router = useRouter();
  const handleEditProfile = () => {
    router.push(`${window.location.pathname}/edit`);
  };
  return (
    <div className="flex items-center justify-between h-[104px] px-4 ">
      <div className="flex items-center space-x-3">
        <Image
          src={userInfo?.memberDto?.profile}
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">{userInfo?.memberDto.nickname}</h2>
          <p
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => router.push('/following_follower')}
          >
            팔로워 {userInfo?.followerCount} · 팔로잉 {userInfo?.followingCount}
          </p>
        </div>
      </div>
      {userInfo.pageType === 'myPage' && (
        <button
          className="px-4 py-2 text-text-light bg-backgrounds-sub rounded-md"
          onClick={handleEditProfile}
        >
          프로필 수정
        </button>
      )}
    </div>
  );
};

export default UserInfo;
