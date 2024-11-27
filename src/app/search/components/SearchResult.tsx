import React, { useState } from 'react';
import CategoryList from './CategoryList';
import { COMMUNITY_LIST } from '../constant';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchResult } from '@/app/api/search/query';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useSession } from 'next-auth/react';
import { mapCategoryToQueryCategory, mapQueryCategoryToCategory } from '../utils';
import { useSearchParams } from 'next/navigation';

const SearchResult = () => {
  const { data: session } = useSession();
  const [categorySelected, setCategorySelected] = useState('전체');
  const searchParams = useSearchParams();
  const search = searchParams.get('q') || '';
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useSearchResult({
    session,
    title: search,
    category: mapCategoryToQueryCategory(categorySelected),
    size: 10,
  });

  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const toggleListClick = (label: string) => {
    setCategorySelected(label);
    refetch();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 px-5 py-3 overflow-x-scroll scrollbar-hide">
        {Object.entries(COMMUNITY_LIST).map(([key, label]) => (
          <CategoryList
            key={key}
            label={label}
            selected={categorySelected === label}
            onClick={() => toggleListClick(label)}
          />
        ))}
      </div>

      <div className="px-5">
        {data?.pages?.flatMap((page) =>
          page?.data?.articles?.map((article: any) => {
            console.log(article);
            return (
              <Link
                key={article.articleId}
                href={`./community/${article.articleId}?type=${categorySelected}`}
              >
                <div className="flex justify-between items-center py-3 border-b border-black">
                  <div className="flex-grow">
                    <div className="inline-block rounded px-2 py-0.5 text-xs">
                      {mapQueryCategoryToCategory(article.articleCategory)}
                    </div>
                    <h4 className="font-bold text-md my-2">{article.title}</h4>
                    <div className="flex text-sm text-gray-500">
                      <Image src="/assets/search.svg" alt="돋보기" width={16} height={16} />
                      <span className="mr-2">{article.viewCount || 0}</span>
                      <Image src="/assets/speechBubble.svg" alt="댓글" width={16} height={16} />
                      <span>{article.commentCount || 0}</span>
                      <span className="ml-2">{article.time || '알 수 없음'}</span>
                      <span className="ml-2">{article.member?.nickname || '익명'}</span>
                    </div>
                  </div>
                  {article.imageUrl && article.imageUrl !== '등록된 이미지가 없습니다.' && (
                    <Image
                      src={article.imageUrl}
                      width={68}
                      height={68}
                      alt="게시글 썸네일"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>
              </Link>
            );
          })
        )}

        {data?.pages?.flatMap((page) => page.data.articles).length === 0 && (
          <div className="mt-20 text-sm text-center text-gray-600">게시글이 없습니다.</div>
        )}

        <div ref={observerRef} className="h-10"></div>

        {isFetchingNextPage && <div className="text-center py-4 text-gray-500">로딩 중...</div>}
      </div>
    </div>
  );
};

export default SearchResult;
