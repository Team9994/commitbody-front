import { getUserInfo } from '@/app/api/profile';
import Mypage from '@/app/profile/[nickname]/hydrated-page';
import { auth } from '@/auth';

const HydratedMypage = async ({ params }: { params: { nickname: string } }) => {
  console.log(params.nickname);
  const session = await auth();
  const userInfo = await getUserInfo(params.nickname, session);
  console.log(userInfo);
  return (
    <div>
      <Mypage nickname={params.nickname} userInfo={userInfo} />
    </div>
  );
};

export default HydratedMypage;
