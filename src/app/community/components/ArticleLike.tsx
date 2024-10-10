'use client';
import {
  useArticleInformCommunity,
  useArticlePostLikeCommunityMutation,
} from '@/app/api/community/query';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface ArticleLikeProps {
  likeCount: number;
  id: string;
}

const ArticleLike = ({ likeCount, id }: ArticleLikeProps) => {
  const { data: session } = useSession();

  const { data } = useArticleInformCommunity({ session, articleId: id });

  const { mutate } = useArticlePostLikeCommunityMutation();
  const handleLikeClick = () => {
    mutate({
      articleId: id,
      session,
    });
  };
  return (
    <div onClick={handleLikeClick} className="flex px-5 py-4">
      <Image src="/assets/recommend.svg" alt="좋아요" width={24} height={24} />
      {data?.data.likeCount ? data.data.likeCount : likeCount}
    </div>
  );
};

export default ArticleLike;
