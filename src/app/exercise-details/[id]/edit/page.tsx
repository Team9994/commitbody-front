'use client';
import Header from '@/components/layouts/Header';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'; // useRouter import
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import useInput from '@/hooks/useInput';
import { useCommentPutMutation } from '@/app/api/exercise-details/query';

const Edit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const exerciseCommentId = searchParams.get('exerciseCommentId');
  const pathSegments = pathname.split('/');
  const exerciseId = pathSegments[pathSegments.length - 2];
  const { putCommentMutation } = useCommentPutMutation(exerciseId, 'default');

  const handleBack = () => {
    router.push(`/exercise-details/${exerciseId}?type=default`);
  };
  const { value: content, onChange } = useInput();

  const ref = React.useCallback((node: HTMLInputElement | null) => {
    if (node) {
      node.focus();
    }
  }, []);

  return (
    <div className="h-screen bg-backgrounds-default">
      <Header
        className="bg-backgrounds-default "
        left={
          <div onClick={handleBack}>
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
          </div>
        }
        center={<h4 className="text-xl font-semibold leading-7 text-text-main">운동 수정</h4>}
        right={
          <span
            onClick={() => {
              putCommentMutation.mutate({
                exerciseCommentId,
                content,
              });
              handleBack();
            }}
            className="font-bold text-blue text-base"
          >
            완료
          </span>
        }
      />
      <Input
        ref={ref}
        value={content}
        onChange={onChange}
        className="w-full px-5 border-none bg-transparent outline-none focus:ring-0 text-text-main"
        placeholder="수정할 내용을 입력하세요"
        style={{ boxShadow: 'none' }}
      />
    </div>
  );
};

export default Edit;
