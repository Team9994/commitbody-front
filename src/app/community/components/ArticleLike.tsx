'use client';
import {
  useArticleInformCommunity,
  useArticlePostLikeCommunityMutation,
} from '@/app/api/community/query';
import Image from 'next/image';
import React from 'react';

interface ArticleLikeProps {
  boardInformData: any;
}

const ArticleLike = ({ boardInformData }: ArticleLikeProps) => {
  const { data } = useArticleInformCommunity({
    articleId: boardInformData.data.articleId,
    boardInformData,
  });
  const { mutate } = useArticlePostLikeCommunityMutation();
  const handleLikeClick = () => {
    mutate({
      articleId: data.data.articleId,
    });
  };

  return (
    <div className="flex px-5 py-4">
      <Image
        onClick={handleLikeClick}
        src={data.data.likeStatus ? '/assets/fillRecommend.svg' : '/assets/recommend.svg'}
        alt="좋아요"
        width={24}
        height={24}
      />
      <span className={data?.data.likeStatus ? 'text-[#198DF7]' : 'text-text-main'}>
        {data?.data.likeCount}
      </span>
    </div>
  );
};

export default ArticleLike;
