'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { useArticleDeleteCommunityMutation } from '@/app/api/community/query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { COMMUNITY } from '@/app/api/community';

interface HeaderMenuProps {
  id: string;
}

const HeaderMenu = ({ id }: HeaderMenuProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get('type');

  const [postOwner, setPostOwner] = useState<boolean>(false); // postOwner 상태 관리
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [routineToDelete, setRoutineToDelete] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { mutate } = useArticleDeleteCommunityMutation();

  const fetchArticleData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${COMMUNITY.GET_DETAIL_ARTICLE}/${id}`,
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
      setPostOwner(data.data.postOwner); // postOwner 상태 설정
    } catch (error) {
      console.error('Error fetching article data:', error);
    }
  };

  useEffect(() => {
    fetchArticleData();
  }, [session]);

  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node) && !routineToDelete) {
      setActiveMenu(false);
    }
  };

  const confirmDelete = () => {
    mutate({
      articleId: id,
      session,
    });
    setRoutineToDelete(false);
    setActiveMenu(false);
  };

  useEffect(() => {
    if (activeMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu, routineToDelete]);

  return (
    <div>
      {postOwner && (
        <>
          <Image
            onClick={() => setActiveMenu((prev) => !prev)}
            src="/assets/menu.svg"
            alt="메뉴"
            width={24}
            height={24}
            className="rotate-90"
          />
          {activeMenu && (
            <div
              ref={menuRef}
              className="absolute top-[calc(50%-12px)] z-10 right-5 shadow-main bg-backgrounds-light text-md"
            >
              <Link
                href={`./${id}/switch?type=${type}`}
                className="inline-block w-[152px] h-[46px] text-text-main p-3 cursor-pointer border-b border-borders-sub"
              >
                수정
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    onClick={() => setRoutineToDelete(true)}
                    className="w-[152px] h-[46px] text-text-accent p-3 cursor-pointer"
                  >
                    삭제
                  </div>
                </AlertDialogTrigger>
                <AlertDialogOverlay className="bg-[rgba(0, 0, 0, 0.7)]" />
                <AlertDialogContent className="w-[296px] h-[148px] bg-backgrounds-sub rounded-6 p-0 flex flex-col items-center text-text-main border-none">
                  <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-lg py-[19px] pb-[11px] font-semibold leading-[26px]">
                      게시글 삭제
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm font-normal leading-5 text-text-main">
                      해당 게시글을 삭제할까요?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center h-12">
                    <AlertDialogCancel
                      className="w-[148px] h-full m-0 p-0 text-md font-medium bg-transparent leading-[22px] text-text-light text-center cursor-pointer border-none
                      focus:outline-none focus:ring-0 active:bg-transparent hover:bg-transparent"
                      onClick={() => {
                        setRoutineToDelete(false);
                        setActiveMenu(false);
                      }}
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
        </>
      )}
    </div>
  );
};

export default HeaderMenu;
