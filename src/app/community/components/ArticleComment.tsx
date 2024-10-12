'use client';
import {
  useArticleCommentCommunity,
  useArticleCommentPostCommunityMutation,
  useArticleDeleteCommentCommunityMutation,
  useArticlePostCommentLikeCommunityMutation,
} from '@/app/api/community/query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui';
import { Input } from '@/components/ui/input';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ArticleCommentProps {
  id: string;
}

const ArticleComment = ({ id }: ArticleCommentProps) => {
  const { data: session } = useSession();
  const { mutate } = useArticleCommentPostCommunityMutation();
  const { mutate: commentMutate } = useArticlePostCommentLikeCommunityMutation();
  const { mutate: deleteCommentMutate } = useArticleDeleteCommentCommunityMutation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { value: content, onChange, reset, handleValueChange } = useInput('');
  const [activeMenuId, setActiveMenuId] = useState<string | undefined>(undefined);
  const [commentToDelete, setCommentToDelete] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [selectCommentMenu, setSelectCommentMenu] = useState<'RECENT' | 'LIKE'>('RECENT');
  const [replyData, setReplyData] = useState<{ commentId: string | null; nickname: string }>({
    commentId: null,
    nickname: '',
  });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticleCommentCommunity(
    id,
    session,
    selectCommentMenu
  );
  const scrollRef = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { rootMargin: '0px' }
  );

  const allComments = data?.pages.flatMap((page) => page.data.comments) || [];

  const handleSendComment = () => {
    if (!content.trim()) {
      alert('댓글을 입력해주세요!');
      return;
    }

    const [user, ...commentArray] = content.split(' ');
    const userContent = commentArray.join(' ').trim();
    const isMention = user.startsWith('@');

    // 멘션된 유저가 있는지 찾기
    const isFindUser = allComments.some((comment) => '@' + comment.nickname === user);

    const isReply = !!replyData.commentId && isFindUser && isMention;

    if (isMention && !isFindUser) {
      alert('유저를 찾지 못했습니다!');
      return;
    }

    mutate({
      articleId: id,
      content: isReply ? userContent : content,
      session,
      reply: isReply,
      parentId: isReply ? (replyData.commentId as string) : undefined,
      replyNickname: isReply ? replyData.nickname : undefined,
    });

    reset();
    setReplyData({ commentId: null, nickname: '' });
  };

  const handleMenuClick = (id: string) => {
    setActiveMenuId(id);
  };

  const handleClickOutside = (e: Event) => {
    const isOpen =
      !commentToDelete && menuRef.current && !menuRef.current.contains(e.target as Node);

    if (isOpen) {
      setActiveMenuId(undefined);
    }
  };

  const confirmDelete = () => {
    console.log(`${commentToDelete}가 삭제되었습니다.`);
    deleteCommentMutate({
      session,
      commentId: activeMenuId as string,
    });
    setCommentToDelete(undefined);
    setActiveMenuId(undefined);
  };

  useEffect(() => {
    if (activeMenuId === undefined) return;

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId, commentToDelete]);

  return (
    <div className="pb-10">
      <div className="flex justify-between py-3 px-5 text-md font-bold">
        <div>댓글 {data?.pages?.[0]?.data?.totalCount || 0}개</div>
        <div className="flex">
          <div
            className={`mr-4 ${selectCommentMenu !== 'RECENT' && 'text-[#777777]'}`}
            onClick={() => setSelectCommentMenu('RECENT')}
          >
            등록순
          </div>
          <div
            className={`${selectCommentMenu !== 'LIKE' && 'text-[#777777]'}`}
            onClick={() => setSelectCommentMenu('LIKE')}
          >
            인기순
          </div>
        </div>
      </div>
      {allComments.map((comment: any, index: number) => (
        <div key={index} className="relative flex px-5 py-3 text-xs">
          <div className="w-6 h-6 rounded-lg mr-2">
            <Image
              src={'/assets/default.svg'}
              alt={comment.nickname}
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div>
              <span className="text-text-sub mr-2">{comment.nickname}</span>
              <span className="text-text-light">{comment.time}</span>
            </div>
            <span className="my-2">{comment.content}</span>
            <div className="flex items-center text-text-sub">
              <div
                onClick={() => {
                  commentMutate({ commentId: comment.commentId, session });
                }}
                className="flex items-center mr-5"
              >
                <Image
                  src={comment.likeStatus ? '/assets/fillRecommend.svg' : '/assets/recommend.svg'}
                  alt="추천"
                  width={24}
                  height={24}
                />
                <span className={comment.likeStatus ? 'text-[#198DF7]' : ''}>
                  {comment.likeCount}
                </span>
              </div>
              <span
                onClick={() => {
                  setReplyData({ commentId: comment.commentId, nickname: comment.nickname });
                  handleValueChange('@' + comment.nickname + ' ');
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                답글 달기
              </span>
            </div>
            {comment.replyCount !== 0 && (
              <p className="mt-2 font-bold text-sm text-[#198DF7]">
                답글 {comment.replyCount}개 보기
              </p>
            )}
          </div>
          {comment.writer && (
            <Image
              onClick={() => handleMenuClick(comment.commentId)}
              src="/assets/menu.svg"
              alt="메뉴"
              width={24}
              height={24}
              className="absolute top-3 right-5"
            />
          )}
          {activeMenuId === comment.commentId && (
            <div
              ref={menuRef}
              className="absolute top-[calc(50%-12px)] z-10 right-5 shadow-main bg-backgrounds-light text-md"
            >
              <div className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub">
                수정
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                    onClick={() => setCommentToDelete(comment.commentId)}
                  >
                    삭제
                  </div>
                </AlertDialogTrigger>
                <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
                <AlertDialogContent className="w-[296px] h-[148px] bg-backgrounds-sub rounded-6 p-0 flex flex-col items-center text-text-main border-none">
                  <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-lg py-[19px] pb-[11px] font-semibold leading-[26px]">
                      댓글 삭제
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm font-normal leading-5 text-text-main">
                      해당 댓글을 삭제할까요?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center h-12">
                    <AlertDialogCancel
                      className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-light text-center cursor-pointer border-none
              focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                      onClick={() => setCommentToDelete(undefined)}
                    >
                      취소
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-accent text-center cursor-pointer border-none
              focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                      onClick={confirmDelete}
                    >
                      삭제
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      ))}
      {allComments.length === 0 && (
        <div className="py-10 flex justify-center text-sm">
          작성된 댓글이 없습니다. 한번 댓글을 남겨볼까요?
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-3">
        <div className="bg-backgrounds-light rounded-6 relative">
          <Input
            id="comment-input"
            placeholder="댓글을 작성해보세요"
            className="h-10 bg-backgrounds-light placeholder-text-light focus:outline-none focus:ring-0 focus:shadow-none border-none"
            style={{ boxShadow: 'none' }}
            onChange={onChange}
            value={content}
            ref={inputRef}
          />
          <Image
            src="/assets/send.svg"
            alt="보내기 버튼"
            width={20}
            height={20}
            className="absolute top-5 right-2 translate-y-[-50%]"
            onClick={handleSendComment}
          />
        </div>
      </div>
      <div ref={scrollRef} className="h-10 invisible" />
    </div>
  );
};

export default ArticleComment;
