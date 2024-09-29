import { COMMUNITY } from '@/app/api/community';
import { auth } from '@/auth';
import Image from 'next/image';
import React from 'react';

interface ArticleInformProps {
  id: string;
}

const ArticleInform = async ({ id }: ArticleInformProps) => {
  const session = await auth();
  console.log(session);
  if (!session?.accessToken) {
    throw new Error('Access token is not available');
  }

  const res = await fetch(
    `${process.env.SPRING_BACKEND_URL}${COMMUNITY.GET_DETAIL_ARTICLE}/${id}`,
    {
      method: 'GET',
      cache: 'force-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch the article data');
  }

  const data = await res.json();
  console.log(data.data);

  return (
    <>
      <div className="flex justify-between items-center py-2 px-5">
        <div className="flex flex-grow">
          <Image
            className="mr-3"
            src={data.data.member.profile}
            width={40}
            height={40}
            alt="프로필"
          />
          <div>
            <p className="text-sm mb-1">{data.data.member.nickname}</p>
            <p className="text-[11px] text-text-light">{data.data.time}</p>
          </div>
        </div>
        {data.data.postOwner ? (
          <div className="flex justify-center items-center w-[81px] h-7 bg-[#1F3750] text-blue text-sm rounded-[4px]">
            {data.data.followStatus}
          </div>
        ) : null}
      </div>
      <div className="w-full h-[360px] relative ">
        <Image alt="인증 사진" src={data.data.imageUrl} fill />
      </div>
      <div className="px-5 py-4">오늘 운동 힘들다</div>
      <div className="flex px-5 py-4">
        <Image src="/assets/recommend.svg" alt="좋아요" width={24} height={24} />
        100
      </div>
      <div className=" h-2 bg-[#161719]" />
    </>
  );
};

export default ArticleInform;
