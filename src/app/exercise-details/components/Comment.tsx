import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';
import useExplain from '../hooks/useExplain';
import { CommentList } from '../types';
import { usePathname } from 'next/navigation';
import defaultPng from './../../../../public/assets/my.svg';

const Comment = () => {
  const {
    handleMenuClick,
    activeMenuId,
    menuRef,
    observerRef,
    commentLists,
    deleteMutation,
    content,
    onChange,
    postCommentLikeMutation,
    postCommentMutation,
    contentReset,
    router,
    id,
    session,
  } = useExplain();

  const pathname = usePathname();
  return (
    <>
      <h3 className="font-lg font-bold leading-[26px] text-text-main mb-2">댓글</h3>

      <div className="relative mb-6">
        <Input
          style={{ boxShadow: 'none' }}
          className="w-full h-[40px] bg-backgrounds-light focus:outline-none border-none placeholder-[#999999]"
          placeholder="댓글을 작성해보세요"
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              postCommentMutation.mutate({ content, exerciseId: id });
              contentReset();
            }
          }}
          value={content}
        />
        <Image
          src={'/assets/send.svg'}
          alt="보내기"
          width={18}
          height={18}
          className="absolute top-1/2 right-[13px] -translate-y-[9px] cursor-pointer"
          onClick={() => {
            if (content.trim() === '') {
              alert('댓글 내용을 입력해주세요.');
              return;
            }
            postCommentMutation.mutate({ content, exerciseId: id });
            contentReset();
          }}
        />
      </div>
      {commentLists?.pages[0]?.data?.commentList.length === 0 && (
        <div className="text-sm text-center my-10">
          작성된 댓글이 없습니다. 한번 댓글을 남겨볼까요?
        </div>
      )}
      {commentLists?.pages
        ?.flatMap((page) => page?.data?.commentList)
        ?.map((data: CommentList) => (
          <section key={data?.exerciseCommentId} className="flex relative w-full mb-7">
            <div className="relative w-6 h-6 rounded-16 overflow-hidden">
              <Image src={session?.user?.image || defaultPng} alt="프로필 사진" fill />
            </div>

            <div className="ml-2">
              <div className="text-xs mb-2">
                <span className="mr-2 text-text-sub">{data?.nickName}</span>
                <span className="text-[#999999]">{data?.commentedAt}</span>
              </div>
              <p className="text-s font-medium text-text-main leading-[18px] mb-1">
                {data?.content}
              </p>
              <div
                onClick={() =>
                  postCommentLikeMutation.mutate({ exCommentId: data.exerciseCommentId })
                }
                className="flex items-center cursor-pointer"
              >
                <Image
                  className="mr-1"
                  src={data?.likeStatus ? '/assets/fillRecommend.svg' : '/assets/recommend.svg'}
                  width={24}
                  height={24}
                  alt="추천"
                />
                <p className={data?.likeStatus ? 'text-blue' : ''}>{data?.likeCount}</p>
              </div>
            </div>
            {data?.writer && (
              <Image
                className="absolute top-0 right-0 cursor-pointer"
                src="/assets/menu.svg"
                width={18}
                height={18}
                alt="menu"
                onClick={() => handleMenuClick(data?.exerciseCommentId)}
              />
            )}

            {data?.writer && activeMenuId === data?.exerciseCommentId && (
              <div
                ref={menuRef}
                className="absolute top-0 z-10 right-0 shadow-main bg-backgrounds-light text-md"
              >
                <div
                  onClick={() => {
                    router.push(`${pathname}/edit?exerciseCommentId=${data?.exerciseCommentId}`);
                  }}
                  className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub"
                >
                  수정
                </div>
                <div
                  onClick={() => deleteMutation.mutate({ exerciseId: data?.exerciseCommentId })}
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
