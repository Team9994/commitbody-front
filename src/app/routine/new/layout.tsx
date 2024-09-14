import { PropsWithChildren } from 'react';

export default function ExerciseListLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="bg-backgrounds-default">
      {/* <Header
        className={'bg-backgrounds-default'}
        left={
          <Link href="/">
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </Link>
        }
        right={<div className="text-base text-blue font-semibold">저장</div>}
      /> */}
      {children}
    </div>
  );
}
