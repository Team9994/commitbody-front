import { COMMUNITY } from '@/app/api/community';
import { auth } from '@/auth';
import Image from 'next/image';
import React from 'react';
import ArticleLike from './ArticleLike';
import AutoBack from './AutoBack';
import FollowBtn from './FollowBtn';
interface ArticleInformProps {
  id: string;
}

const ArticleInform = async ({ id }: ArticleInformProps) => {
  const session = await auth();
  const res = await fetch(
    `${process.env.SPRING_BACKEND_URL}${COMMUNITY.GET_DETAIL_ARTICLE}/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
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
  console.log(data);
  if (data.data.member.blockStatus) {
    alert('차단한 사용자입니다. 이전 페이지로 이동합니다.');
    return <AutoBack />;
  }

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
        {!data.data.postOwner ? <FollowBtn data={data} /> : null}
      </div>
      {data.data.title && (
        <div className="flex px-5 py-4 items-center">
          <div className="flex justify-center items-center mr-2 w-10 h-7 bg-backgrounds-sub rounded-[4px] text-text-light text-sm">
            정보
          </div>
          <div>{data.data.title}</div>
        </div>
      )}
      {data.data.imageUrl !== '등록된 이미지 파일이 없습니다.' && (
        <div className="w-full h-[360px] relative ">
          <Image alt="인증 사진" src={data.data.imageUrl} fill />
        </div>
      )}

      {data.data.content && <div className="px-5 py-4">{data.data.content}</div>}

      <ArticleLike boardInformData={data} />
      <div className=" h-2 bg-[#161719]" />
    </>
  );
};

export default ArticleInform;
