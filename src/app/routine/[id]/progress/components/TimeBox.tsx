'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const TimeBox = ({
  setExerciseDurationSeconds,
}: {
  setExerciseDurationSeconds: (seconds: number) => void;
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        setExerciseDurationSeconds(seconds);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  // 컴포넌트가 마운트될 때 타이머 시작
  useEffect(() => {
    setIsActive(true);
  }, []);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-6 justify-between max-w-[400px] p-4 w-full fixed h-[56px] bottom-2 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white rounded-full py-1 flex items-center space-x-2">
      <button className="text-gray-400" onClick={resetTimer}>
        <Image src={'/assets/refresh.svg'} alt="리프레시" width={28} height={28} />
      </button>
      <span className="font-mono text-[24px]">{formatTime(seconds)}</span>
      <button className="text-gray-400" onClick={toggleTimer}>
        {isActive ? (
          <Image src={'/assets/pause.svg'} alt="일시정지" width={28} height={28} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default TimeBox;
