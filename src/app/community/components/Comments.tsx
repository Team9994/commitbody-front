'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
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
import { useSession } from 'next-auth/react';
import {
  useArticleDetailCommentCommunity,
  useArticlePostCommentLikeCommunityMutation,
} from '@/app/api/community/query';
import Replys from './Replys';

interface CommentProps {
  comment: any;
  confirmDelete: (commentId: string) => void;
  setCommentToDelete: (id: number) => void;
  handleMention: (commentId: string, nickname: string) => void;
}

const Comments = ({ comment, confirmDelete, setCommentToDelete, handleMention }: CommentProps) => {
  const { data: session } = useSession();
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { data: detailComments, refetch } = useArticleDetailCommentCommunity({
    commentId: activeCommentId,
    session,
  });

  const { mutate: likeComment } = useArticlePostCommentLikeCommunityMutation();

  const handleLike = (commentId: string) => {
    likeComment({ commentId, session });
  };

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? undefined : id);
  };

  useEffect(() => {
    if (activeCommentId !== null) refetch();
  }, [activeCommentId, refetch]);

  const handleClickOutside = (e: MouseEvent) => {
    const isInsideMenu = menuRef.current && menuRef.current.contains(e.target as Node);
    const isAlertDialog = (e.target as HTMLElement).closest('[data-alert-dialog]');

    if (!isInsideMenu && !isAlertDialog) {
      setActiveMenu(undefined);
    }
  };

  useEffect(() => {
    if (activeMenu === undefined) return;

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu, confirmDelete]);

  return (
    <div className="relative flex px-5 py-3 text-xs">
      <div className="w-6 h-6 rounded-lg mr-2">
        <Image
          src={comment.profile || '/assets/default.svg'}
          alt={comment.nickname}
          width={24}
          height={24}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-text-sub mr-2">{comment.nickname}</span>
            <span className="text-text-light">{comment.time}</span>
          </div>

          {comment.writer && (
            <Image
              src="/assets/menu.svg"
              alt="메뉴"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => toggleMenu(comment.commentId)}
            />
          )}
        </div>

        <span className="my-2">{comment.content}</span>

        <div className="flex items-center text-text-sub">
          <div
            onClick={() => handleLike(comment.commentId)}
            className="flex items-center mr-5 cursor-pointer"
          >
            <Image
              src={comment.likeStatus ? '/assets/fillRecommend.svg' : '/assets/recommend.svg'}
              alt="추천"
              width={24}
              height={24}
            />
            <span className={comment.likeStatus ? 'text-blue' : ''}>{comment.likeCount}</span>
          </div>

          <span
            className="cursor-pointer"
            onClick={() => handleMention(comment.commentId, comment.nickname)}
          >
            답글 달기
          </span>
        </div>

        {activeMenu === comment.commentId && (
          <div
            ref={menuRef}
            className="absolute top-0 right-5 shadow-main bg-backgrounds-light text-md"
          >
            <div className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub">
              수정
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div
                  onClick={() => setCommentToDelete(comment.commentId)}
                  className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                >
                  삭제
                </div>
              </AlertDialogTrigger>
              <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
              <AlertDialogContent
                className="w-[296px] h-[148px] bg-backgrounds-sub rounded-6 p-0 flex flex-col items-center text-text-main border-none"
                data-alert-dialog
              >
                <AlertDialogHeader className="text-center">
                  <AlertDialogTitle className="text-lg py-[19px] pb-[11px] font-semibold leading-[26px]">
                    댓글 삭제
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm font-normal leading-5 text-text-main">
                    해당 댓글을 삭제할까요?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex items-center h-12">
                  <AlertDialogCancel className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-light text-center cursor-pointer border-none">
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-accent text-center cursor-pointer border-none"
                    onClick={() => confirmDelete(comment.commentId)}
                  >
                    삭제
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {comment.replyCount > 0 && (
          <>
            {activeCommentId === comment.commentId ? (
              <>
                {detailComments?.data.comments.map((reply: any) => (
                  <Replys
                    key={reply.commentId}
                    reply={reply}
                    handleLike={handleLike}
                    setCommentToDelete={setCommentToDelete}
                  />
                ))}
                <div
                  onClick={() => setActiveCommentId(null)}
                  className="mt-2 font-bold text-sm text-blue cursor-pointer"
                >
                  답글 숨기기
                </div>
              </>
            ) : (
              <div
                onClick={() => setActiveCommentId(comment.commentId)}
                className="mt-2 font-bold text-sm text-blue cursor-pointer"
              >
                답글 {comment.replyCount}개 보기
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
