import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';
import useExplain from '../hooks/useExplain';
import { CommentList } from '../types';
import { deleteComment } from '@/app/api/exercise-comment';
import { useSession } from 'next-auth/react';
import { useCommentDeleteMutation } from '@/app/api/exercise-comment/query';

interface CommentProps {
  id: string;
  type: 'custom' | 'default';
}

const Comment = ({ id, type }: CommentProps) => {
  const { handleMenuClick, activeMenuId, menuRef, observerRef, isLoading, commentLists } =
    useExplain(id, type);
  const { data: session } = useSession();
  const mutation = useCommentDeleteMutation(id, session, 'default');
  return (
    <>
      <h3 className="font-lg font-bold leading-[26px] text-text-main mb-2">댓글</h3>
      <div className="relative mb-6">
        <Input
          style={{ boxShadow: 'none' }}
          className="w-full h-[40px] bg-backgrounds-light focus:outline-none border-none placeholder-[#999999]"
          placeholder="댓글을 작성해보세요"
        />
        <Image
          src={'/assets/send.svg'}
          alt="보내기"
          width={18}
          height={18}
          className="absolute top-1/2 right-[13px] -translate-y-[9px]"
        />
      </div>

      {commentLists?.pages
        ?.flatMap((page) => page.data.commentList)
        ?.map((data: CommentList) => (
          <section key={data.exerciseCommentId} className="flex relative w-full mb-7">
            <div className="bg-backgrounds-sub w-6 h-6 rounded-full" />
            <div className="ml-2">
              <div className="text-xs mb-2">
                <span className="mr-2 text-text-sub">{data.nickName}</span>
                <span className="text-[#999999]">{data.commentedAt}</span>
              </div>
              <p className="text-s font-medium text-text-main leading-[18px] mb-1">
                {data.content}
              </p>
              <div className="flex items-center">
                <Image
                  className="mr-1"
                  src="/assets/recommend.svg"
                  width={24}
                  height={24}
                  alt="추천"
                />
                <p>{data.likeCount}</p>
              </div>
            </div>
            <Image
              className="absolute top-0 right-0 cursor-pointer"
              src="/assets/menu.svg"
              width={18}
              height={18}
              alt="menu"
              onClick={() => handleMenuClick(data.exerciseCommentId)}
            />

            {data.writer && activeMenuId === data.exerciseCommentId && (
              <div
                ref={menuRef}
                className="absolute top-0 z-10 right-0 shadow-main bg-backgrounds-light text-md"
              >
                <div className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub">
                  수정
                </div>
                <div
                  onClick={() => mutation.mutate({ exerciseId: data.exerciseCommentId, session })}
                  className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                >
                  삭제
                </div>
              </div>
            )}
          </section>
        ))}

      <div ref={observerRef} className="h-1 w-40" />
    </>
  );
};

export default Comment;
