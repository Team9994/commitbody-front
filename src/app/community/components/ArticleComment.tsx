'use client';
import {
  useArticleCommentCommunity,
  useArticleCommentPostCommunityMutation,
  useArticleDeleteCommentCommunityMutation,
} from '@/app/api/community/query';
import { Input } from '@/components/ui/input';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Comments from './Comments';

interface ArticleCommentProps {
  id: string;
}

const ArticleComment = ({ id }: ArticleCommentProps) => {
  const { data: session } = useSession();
  const [activeMenuId, setActiveMenuId] = useState<string | undefined>(undefined);
  const [commentToDelete, setCommentToDelete] = useState<number | undefined>(undefined);
  const [replyData, setReplyData] = useState<{ commentId: string | null; nickname: string }>({
    commentId: null,
    nickname: '',
  });
  const [selectCommentMenu, setSelectCommentMenu] = useState<'RECENT' | 'LIKE'>('RECENT');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { value: content, onChange, reset, handleValueChange } = useInput('');

  const { mutate: postComment } = useArticleCommentPostCommunityMutation();
  const { mutate: deleteComment } = useArticleDeleteCommentCommunityMutation();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticleCommentCommunity(
    id,
    session,
    selectCommentMenu
  );

  const scrollRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const allComments = data?.pages.flatMap((page) => page.data.comments) || [];
  selectCommentMenu === 'LIKE' && allComments.sort((a, b) => b.likeCount - a.likeCount);
  selectCommentMenu === 'RECENT' && allComments.sort((a, b) => a.likeCount - b.likeCount);

  const handleSendComment = () => {
    if (!content.trim()) return alert('댓글을 입력해주세요!');

    const isReply = content.trim().startsWith('@');

    const sendMessage = isReply ? content.split(' ')[1] : content;
    postComment({
      articleId: id,
      content: sendMessage,
      session,
      reply: isReply,
      parentId: isReply ? (replyData.commentId as string) : undefined,
      replyNickname: isReply ? replyData.nickname : '',
    });

    reset();
    setReplyData({ commentId: null, nickname: '' });
  };

  const handleMention = (commentId: string, nickname: string) => {
    setReplyData({ commentId, nickname });
    inputRef.current?.focus();
    inputRef.current!.value = `@${nickname} `;
    handleValueChange(`@${nickname} `);
  };

  const confirmDelete = (commentId: string) => {
    deleteComment({ session, commentId });
    console.log('삭제완료');
    setCommentToDelete(undefined);
    setActiveMenuId(undefined);
  };

  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setActiveMenuId(undefined);
    }
  };

  useEffect(() => {
    if (activeMenuId === undefined) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenuId]);

  return (
    <div className="pb-10">
      <div className="flex justify-between py-3 px-5 text-md font-bold">
        <div>댓글 {data?.pages?.[0]?.data?.totalCount || 0}개</div>
        <div className="flex">
          {['RECENT', 'LIKE'].map((menu) => (
            <div
              key={menu}
              className={`mr-4 ${selectCommentMenu !== menu && 'text-[#777777]'}`}
              onClick={() => setSelectCommentMenu(menu as 'RECENT' | 'LIKE')}
            >
              {menu === 'RECENT' ? '등록순' : '인기순'}
            </div>
          ))}
        </div>
      </div>

      {allComments.length === 0 ? (
        <div className="py-10 flex justify-center text-sm">작성된 댓글이 없습니다.</div>
      ) : (
        allComments.map((comment) => (
          <Comments
            key={comment.commentId}
            handleMention={handleMention}
            comment={comment}
            confirmDelete={confirmDelete}
            setCommentToDelete={setCommentToDelete}
          />
        ))
      )}

      <div className="fixed bottom-0 left-0 right-0 px-5 py-3">
        <div className="bg-backgrounds-light rounded-6 relative">
          <Input
            placeholder="댓글을 작성해보세요"
            value={content}
            onChange={(e) => {
              onChange(e);
              handleValueChange(e.target.value);
            }}
            ref={inputRef}
            className="h-10 bg-backgrounds-light placeholder-text-light border-none focus:outline-none"
          />
          <Image
            src="/assets/send.svg"
            alt="보내기 버튼"
            width={20}
            height={20}
            className="absolute top-5 right-2 -translate-y-1/2 cursor-pointer"
            onClick={handleSendComment}
          />
        </div>
      </div>
      <div ref={scrollRef} className="h-10 invisible" />
    </div>
  );
};

export default ArticleComment;
