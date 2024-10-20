import Mypage from '@/app/mypage/[nickname]/hydrated-page';

const HydratedMypage = ({ params }: { params: { nickname: string } }) => {
  console.log(params.nickname);
  return (
    <div>
      <Mypage nickname={params.nickname} />
    </div>
  );
};

export default HydratedMypage;
