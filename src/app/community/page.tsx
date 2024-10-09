'use client';
import Header from '@/components/layouts/Header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SelectToggle from './components/SelectToggle';
import { COMMUNITY_LIST } from './constant/select';
import CategoryList from './components/CategoryList';
import WriteButton from './components/WriteButton';
import { Drawer } from '@/components/ui/drawer';
import Link from 'next/link';
import { useArticleCommunity } from '../api/community/query';
import { useSession } from 'next-auth/react';
import {
  mapCategoryToQueryCategory,
  mapMenuToQueryType,
  mapQueryCategoryToCategory,
} from './utils';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const Community = () => {
  const { data: session } = useSession();
  console.log(session);
  const [menuSelected, setMenuSelected] = useState<'certification' | 'question'>('certification');
  const [categorySelected, setCategorySelected] = useState('전체');
  const currentList = COMMUNITY_LIST[menuSelected] as { [key: string]: string };
  const queryType = mapMenuToQueryType(menuSelected);
  const queryCategory = mapCategoryToQueryCategory(categorySelected);

  const {
    data: articleResults,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useArticleCommunity({ session, type: queryType, category: queryCategory });

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const toggleListClick = (label: string) => {
    setCategorySelected(label);
  };

  const handleWriteClick = () => {
    setToggleDrawer((pre) => !pre);
  };

  const observerRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    { rootMargin: '50px', threshold: 0 }
  );

  useEffect(() => {
    setCategorySelected('전체');
    setToggleDrawer(false);
    if (session) {
      refetch();
    }
  }, [menuSelected, session, refetch]);

  useEffect(() => {
    refetch();
  }, [categorySelected]);

  return (
    <div>
      <Header
        left={<h4 className="text-xl font-semibold leading-7 text-text-main">커뮤니티</h4>}
        right={
          <div className="flex gap-4">
            <Image src={'/assets/search.svg'} alt={'돋보기'} width={28} height={28} />
            <Image src={'/assets/profilePlus.svg'} alt={'친구추가'} width={28} height={28} />
            <Image src={'/assets/bell.svg'} alt={'알림'} width={17} height={21} />
          </div>
        }
        className="relative z-20"
      ></Header>

      <SelectToggle selected={menuSelected} setSelected={setMenuSelected} />

      <div className="flex gap-2 px-5 py-3 overflow-x-scroll scrollbar-hide">
        {Object.keys(currentList).map((key) => {
          const selected = categorySelected === currentList[key];
          return (
            <CategoryList
              key={key}
              label={currentList[key]}
              selected={selected}
              onClick={toggleListClick}
            />
          );
        })}
      </div>

      {menuSelected === 'certification' && (
        <div className="overflow-y-scroll" style={{ height: 'calc(100vh - 217px)' }}>
          <div
            className="grid justify-center"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)', // 한 줄에 3개의 열을 고정
              gap: '2px',
            }}
          >
            {articleResults?.pages.flatMap((page) =>
              page.data.articles.map((article: any) => {
                if (article.imageUrl === '등록된 이미지가 없습니다.') {
                  return null;
                }
                return (
                  <Link key={article.articleId} href={`./community/${article.articleId}`}>
                    <div
                      className="relative"
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1',
                        objectFit: 'cover',
                      }}
                    >
                      <Image src={article.imageUrl} alt="운동 인증 사진" fill />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
          {articleResults?.pages.flatMap((page) => page.data.articles).length === 0 && (
            <div className="mt-20 text-sm flex justify-center text-text-main">
              게시글이 없습니다.
            </div>
          )}
        </div>
      )}

      {menuSelected === 'question' && (
        <div className="px-5">
          {articleResults?.pages.flatMap((page) =>
            page.data.articles.map((article: any) => (
              <Link key={article.articleId} href={`./community/${article.articleId}`}>
                <div
                  key={article.articleId}
                  className="flex justify-between items-center py-3 border-b border-[black]"
                >
                  <div className="flex-grow">
                    <div className="inline-block rounded-[4px] bg-backgrounds-sub px-2 py-0.5 text-text-light text-xs">
                      {mapQueryCategoryToCategory(article.articleCategory)}
                    </div>
                    <h4 className="font-bold text-md text-text-main my-2">{article.title}</h4>
                    <div className="flex text-text-light text-[11px]">
                      <Image src={'/assets/search.svg'} alt={'돋보기'} width={16} height={16} />
                      <span className="mr-2">{article.viewCount || 0}</span>
                      <Image src={'/assets/speechBubble.svg'} alt={'댓글'} width={16} height={16} />
                      <span>{article.commentCount || 0}</span>
                      <span className="ml-2">{article.time}</span>
                      <span className="ml-2">{article.member.nickname}</span>
                    </div>
                  </div>
                  <div>
                    {article.imageUrl && article.imageUrl !== '등록된 이미지가 없습니다.' && (
                      <Image
                        src={article.imageUrl}
                        width={68}
                        height={68}
                        alt="게시글 썸네일"
                        style={{ width: '68px', height: '68px', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}

          {articleResults?.pages.flatMap((page) => page.data.articles).length === 0 && (
            <div className="mt-20 text-sm flex justify-center text-text-main">
              게시글이 없습니다.
            </div>
          )}
        </div>
      )}

      <Drawer open={toggleDrawer} onClose={handleWriteClick}>
        <div
          className={`fixed w-full h-screen inset-0 bg-backgrounds-default opacity-70 z-40 transition-opacity duration-300 ${
            toggleDrawer ? 'opacity-70 visible' : 'opacity-0 invisible'
          }`}
          onClick={handleWriteClick}
        ></div>
        <div
          className={`fixed bg-backgrounds-sub h-[250px] w-full rounded-tl-[28px] rounded-tr-[28px] overflow-y-auto z-50 bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out transform ${
            toggleDrawer ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="relative">
            <h3 className="text-lg h-16 text-white text-center font-bold py-5 border-b-[1px] border-b-solid border-backgrounds-light">
              게시글 작성
            </h3>
            <Image
              onClick={handleWriteClick}
              className="absolute top-4 right-4 cursor-pointer"
              src="/assets/close.svg"
              width={30}
              height={30}
              alt="닫기"
            />

            <div className="text-white">
              <Link
                href="/community/writePost?cur=certification"
                className="block p-5 border-b-[1px] border-b-solid border-backgrounds-light active:opacity-70 hover:opacity-70"
              >
                <h3 className="pb-2 font-bold text-base">운동 인증</h3>
                <p className="text-text-light text-sm">오늘의 운동을 기록으로 남기고 공유해요</p>
              </Link>
              <Link
                href="/community/writePost?cur=question"
                className="block p-5 active:opacity-70 hover:opacity-70"
              >
                <h3 className="pb-2 font-bold text-base">정보&질문</h3>
                <p className="text-text-light text-sm">운동에 관한 정보를 공유하고 질문해요</p>
              </Link>
            </div>
          </div>
        </div>
      </Drawer>

      <WriteButton onClick={handleWriteClick} />
      <div ref={observerRef} className="h-10 w-40" />
    </div>
  );
};

export default Community;
