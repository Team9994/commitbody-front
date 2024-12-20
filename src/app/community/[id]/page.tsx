import Header from '@/components/layouts/Header';
import React from 'react';
import ArticleInform from '../components/ArticleInform';
import Back from '@/components/common/Back';
import ArticleComment from '../components/ArticleComment';
import HeaderMenu from '../components/HeaderMenu';
import Link from 'next/link';

const exerciseWriteDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen bg-backgrounds-default text-text-main">
      <Header
        className="bg-backgrounds-default relative"
        left={
          <div>
            <Link href="/community">
              <Back />
            </Link>
          </div>
        }
        right={
          <div>
            <HeaderMenu id={params.id} />
          </div>
        }
      />
      <ArticleInform id={params.id} />
      <ArticleComment id={params.id} />
    </div>
  );
};

export default exerciseWriteDetail;
