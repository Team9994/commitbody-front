'use client';
import React from 'react';

interface SetInfo {
  weight?: number;
  reps?: number;
  time?: number;
}

interface ExerciseSetInfoProps {
  sets: number;
  setInfos: SetInfo[];
  onSetInfoChange: (setInfos: SetInfo[]) => void;
  exerciseType: string;
}

const ExerciseSetInfo: React.FC<ExerciseSetInfoProps> = ({
  sets,
  setInfos,
  onSetInfoChange,
  exerciseType,
}) => {
  const addSet = () => {
    let newSet: SetInfo = {};
    switch (exerciseType) {
      case 'weightReps':
        newSet = { weight: 0, reps: 0 };
        break;
      case 'time':
        newSet = { time: 0 };
        break;
      case 'reps':
        newSet = { reps: 0 };
        break;
      default:
        newSet = {};
    }
    onSetInfoChange([...setInfos, newSet]);
  };

  const removeSet = () => {
    if (setInfos.length > 1) {
      onSetInfoChange(setInfos.slice(0, -1));
    }
  };

  const handleChange = (index: number, field: keyof SetInfo, value: number) => {
    const newSetInfos = [...setInfos];
    newSetInfos[index] = { ...newSetInfos[index], [field]: value };
    onSetInfoChange(newSetInfos);
  };

  return (
    <div className="p-4 gap-3">
      {setInfos.map((setInfo, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-2 h-13 bg-backgrounds-sub px-[14px] rounded-6"
        >
          <span className="text-text-light">{index + 1}세트</span>
          {exerciseType === '무게와 횟수' && (
            <>
              <div className="relative w-20">
                <input
                  type="number"
                  value={setInfo.weight || 0}
                  onChange={(e) => handleChange(index, 'weight', Number(e.target.value))}
                  className="w-full bg-backgrounds-sub text-white text-right pr-7 text-lg"
                  placeholder="0"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-light">
                  kg
                </span>
              </div>
              <div className="relative w-20">
                <input
                  type="number"
                  value={setInfo.reps || 0}
                  onChange={(e) => handleChange(index, 'reps', Number(e.target.value))}
                  className="w-full bg-backgrounds-sub text-white text-right pr-7 text-lg"
                  placeholder="0"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-light">
                  회
                </span>
              </div>
            </>
          )}

          {exerciseType === '시간 단위' && (
            <div className="relative w-20">
              <input
                type="number"
                value={setInfo.time || 0}
                onChange={(e) => handleChange(index, 'time', Number(e.target.value))}
                className="w-full bg-backgrounds-sub text-white text-right pr-7 text-lg"
                placeholder="0"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-light">
                분
              </span>
            </div>
          )}

          {exerciseType === '횟수' && (
            <div className="relative w-20">
              <input
                type="number"
                value={setInfo.reps || 0}
                onChange={(e) => handleChange(index, 'reps', Number(e.target.value))}
                className="w-full bg-backgrounds-sub text-white text-right pr-7 text-lg"
                placeholder="0"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-light">
                회
              </span>
            </div>
          )}

          <input type="checkbox" className="ml-2" />
        </div>
      ))}
      <div className="flex w-full mt-4 gap-2 h-9">
        <button
          onClick={removeSet}
          className="w-full rounded-6 border-[#3A3E47] border text-text-light"
        >
          - 세트 삭제
        </button>
        <button
          onClick={addSet}
          className="w-full text-text-light rounded-6 border-[#3A3E47] border"
        >
          + 세트 추가
        </button>
      </div>
    </div>
  );
};

export default ExerciseSetInfo;
