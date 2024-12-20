import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Question 타입 정의
export interface Question {
  articleId: string;
  articleCategory: string;
  title: string;
  commentCount: number;
  time: string;
  likeCount: number;
  imageUrl: string;
}

interface QuestionListProps {
  questions: Question[];
}

const QuestionList = ({ questions }: QuestionListProps) => {
  const router = useRouter();
  return (
    <div className="p-4 text-white">
      <ul className="mb-20">
        {questions.map((question) => (
          <li
            onClick={() => router.push(`/community/${question?.articleId}?type=question`)}
            key={question.articleId}
            className="flex justify-between items-center py-3 border-b border-black cursor-pointer"
          >
            <div className="flex-grow">
              <div className="inline-block rounded-[4px] bg-backgrounds-sub px-2 py-0.5 text-text-light text-xs">
                {question.articleCategory === 'INFORMATION' && '정보'}
              </div>
              <h4 className="font-bold text-md text-text-main my-2">{question.title}</h4>
              <div className="flex text-text-light text-[11px]">
                <Image src={'/assets/search.svg'} alt={'View Count'} width={16} height={16} />
                <span className="mr-2">{question.likeCount || 0}</span>
                <Image
                  src={'/assets/speechBubble.svg'}
                  alt={'Comment Count'}
                  width={16}
                  height={16}
                />
                <span>{question.commentCount || 0}</span>
                <span className="ml-2">{question.time}</span>
              </div>
            </div>
            <div>
              {question.imageUrl && question.imageUrl !== '등록된 이미지 파일이 없습니다.' && (
                <Image src={question.imageUrl} width={68} height={68} alt="Question Thumbnail" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
