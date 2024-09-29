import Header from '@/components/layouts/Header';
import React from 'react';
import Image from 'next/image';
import ArticleInform from '../components/ArticleInform';

const exerciseWriteDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen bg-backgrounds-default text-text-main">
      <Header
        className="bg-backgrounds-default"
        left={
          <div>
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        right={
          <div>
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
      />
      <ArticleInform id={params.id} />
    </div>
  );
};

export default exerciseWriteDetail;
