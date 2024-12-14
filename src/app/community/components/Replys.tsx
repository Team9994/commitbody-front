'use client';
import React, { useEffect, useRef, useState } from 'react';
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
import { useArticleDeleteCommentCommunityMutation } from '@/app/api/community/query';

interface ReplyProps {
  reply: any;
  handleLike: (commentId: string) => void;
  setCommentToDelete: (id: number) => void;
}

const Replys = ({ reply, handleLike, setCommentToDelete }: ReplyProps) => {
  const [activeReplyMenu, setActiveReplyMenu] = useState<boolean>(false);
  const { mutate: deleteComment } = useArticleDeleteCommentCommunityMutation();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleReplyMenu = () => {
    setActiveReplyMenu((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const isInsideMenu = menuRef.current && menuRef.current.contains(e.target as Node);
    const isAlertDialog = (e.target as HTMLElement).closest('[data-alert-dialog]');

    if (!isInsideMenu && !isAlertDialog) {
      setActiveReplyMenu(false);
    }
  };

  const confirmDelete = (commentId: string) => {
    deleteComment({ commentId });
    setActiveReplyMenu(false);
  };

  useEffect(() => {
    if (activeReplyMenu === undefined) return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-col mt-4 relative">
      <div className="flex">
        <div className="w-5 h-5 rounded-lg mr-2">
          <Image
            src={reply.profile || '/assets/default.svg'}
            alt={reply.nickname}
            width={20}
            height={20}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-text-sub mr-2">{reply.nickname}</span>
              <span className="text-text-light">{reply.time}</span>
            </div>
            {reply.writer && (
              <Image
                src="/assets/menu.svg"
                alt="메뉴"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={toggleReplyMenu}
              />
            )}

            {activeReplyMenu && (
              <div
                ref={menuRef}
                className="absolute top-0 right-0 bg-backgrounds-light text-md shadow-main"
              >
                <div className="w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub">
                  수정
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div
                      onClick={() => setCommentToDelete(reply.commentId)}
                      className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                    >
                      삭제
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
                  <AlertDialogContent
                    data-alert-dialog
                    className="w-[296px] h-[148px] bg-backgrounds-sub rounded-6 p-0 flex flex-col items-center text-text-main border-none"
                  >
                    <AlertDialogHeader className="text-center">
                      <AlertDialogTitle className="text-lg py-[19px] pb-[11px] font-semibold leading-[26px]">
                        대댓글 삭제
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm font-normal leading-5 text-text-main">
                        해당 대댓글을 삭제할까요?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex items-center h-12">
                      <AlertDialogCancel
                        className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-light text-center cursor-pointer border-none
                        focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                      >
                        취소
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-accent text-center cursor-pointer border-none
                        focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                        onClick={() => confirmDelete(reply.commentId)}
                      >
                        삭제
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
          <span className="my-2">{reply.content}</span>
          <div
            onClick={() => handleLike(reply.commentId)}
            className="flex items-center cursor-pointer"
          >
            <Image
              src={reply.likeStatus ? '/assets/fillRecommend.svg' : '/assets/recommend.svg'}
              alt="추천"
              width={20}
              height={20}
            />
            <span className={reply.likeStatus ? 'text-blue' : ''}>{reply.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replys;
