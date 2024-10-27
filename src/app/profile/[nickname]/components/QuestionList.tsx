import React from 'react';
import Image from 'next/image';

interface Question {
  id: string;
  title: string;
  likes: number;
  comments: number;
  views: number;
  imageUrl: string;
}

interface QuestionListProps {
  questions: Question[];
}

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  const mock_questions = [
    {
      id: '1',
      title: '질문 1',
      likes: 10,
      comments: 2,
      views: 3,
      imageUrl: '/assets/heart_on.svg',
    },
    {
      id: '2',
      title: '질문 2',
      likes: 10,
      comments: 2,
      views: 3,
      imageUrl: '/assets/heart_on.svg',
    },
  ];
  return (
    <div className="p-4  text-white">
      <ul className="space-y-4">
        {mock_questions.map((question) => (
          <li key={question.id} className="border-b border-gray-700 pb-4 flex">
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg mb-2">{question.title}</h3>
              <div className="flex space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <HeartIcon />
                  <span className="ml-1">{question.likes}</span>
                </span>
                <span className="flex items-center">
                  <CommentIcon />
                  <span className="ml-1">{question.comments}</span>
                </span>
                <span className="flex items-center">
                  <EyeIcon />
                  <span className="ml-1">{question.views}</span>
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 mr-4">
              <Image
                src={question.imageUrl}
                alt="Question thumbnail"
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
