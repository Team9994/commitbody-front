'use client';
import { useGetUserInfo, useUserArticle } from '@/app/api/profile/query';
import { useState } from 'react';
import UserInfo from './components/UserInfo';
import SelectToggle from './components/SelectToggle';
import Image from 'next/image';
import Header from '@/components/layouts/Header';
import Link from 'next/link';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import CertificationList, { Certification } from './components/CertificationList';
import QuestionList, { Question } from './components/QuestionList';

const HydratedMypage = ({ params }: { params: { nickname: string } }) => {
  const { data: userInfo } = useGetUserInfo({ nickname: params.nickname });
  const [selected, setSelected] = useState<'certification' | 'question'>('certification');
  console.log(userInfo);
  const {
    data: articleQuery,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useUserArticle({
    type: selected === 'certification' ? 'EXERCISE' : 'INFO_QUESTION',
    id: userInfo?.memberId,
  });

  const observerRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { rootMargin: '50px', threshold: 0 }
  );

  const certifications: Certification[] =
    articleQuery?.pages?.flatMap((page) =>
      page?.articles.map((article: Certification) => ({
        articleId: article.articleId,
        imageUrl: article.imageUrl,
      }))
    ) || [];

  const questions: Question[] =
    articleQuery?.pages?.flatMap((page) =>
      page?.articles.map((article: Question) => ({
        articleId: article.articleId,
        articleCategory: article.articleCategory,
        title: article.title,
        commentCount: article.commentCount,
        time: article.time,
        likeCount: article.likeCount,
        imageUrl: article.imageUrl,
      }))
    ) || [];

  return (
    <div>
      <Header
        left={
          <>
            {userInfo?.pageType === 'myPage' && (
              <div className="text-text-main font-semibold text-2xl">MY</div>
            )}
            {userInfo?.pageType !== 'myPage' && (
              <Image src={'/assets/back.svg'} alt={'로고'} width={24} height={24} />
            )}
          </>
        }
        right={
          <div className="flex gap-5">
            {userInfo?.pageType !== 'myPage' && (
              <Link href={'./menu'}>
                <Image
                  alt={'메뉴'}
                  className="cursor-pointer rotate-90"
                  src={'/assets/menu.svg'}
                  width={24}
                  height={28}
                />
              </Link>
            )}

            {userInfo?.pageType === 'myPage' && (
              <>
                <Link href={'/alarm'}>
                  <Image
                    className="cursor-pointer"
                    src={'/assets/bell.svg'}
                    alt={'알림'}
                    width={17}
                    height={21}
                  />
                </Link>
                <Link href={'/config-setting'}>
                  <Image
                    className="cursor-pointer"
                    src={'/assets/config.svg'}
                    alt={'환경설정'}
                    width={24}
                    height={24}
                  />
                </Link>
              </>
            )}
          </div>
        }
        className="relative z-20"
        onLeftClick="back"
      />
      <UserInfo userInfo={userInfo} />
      <SelectToggle selected={selected} setSelected={setSelected} />
      {selected === 'certification' && <CertificationList certifications={certifications} />}
      {selected === 'question' && <QuestionList questions={questions} />}

      {articleQuery?.pages?.flatMap((page) => page?.data?.articles).length === 0 && (
        <div className="mt-20 text-sm flex justify-center text-text-main">게시글이 없습니다.</div>
      )}
      <div ref={observerRef} className="h-5 w-full" />
    </div>
  );
};

export default HydratedMypage;
