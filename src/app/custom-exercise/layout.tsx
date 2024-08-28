import Header from '@/components/layouts/Header';
import { PropsWithChildren } from 'react';
import Back from '../../components/common/Back';

export default function ExerciseCustomlayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header
        className={'bg-backgrounds-default'}
        left={<Back />}
        center={
          <h4 className="text-xl font-semibold leading-7 text-text-main">커스텀 운동 추가</h4>
        }
      />
      {children}
    </>
  );
}
