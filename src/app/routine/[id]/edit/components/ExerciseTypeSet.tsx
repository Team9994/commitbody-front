import Image from 'next/image';

interface ExerciseTypeProps {
  routineDetailId: number;
  exerciseType: string;
  set: number;
}

const ExerciseTypeSet = ({ routineDetailId, exerciseType, set }: ExerciseTypeProps) => {
  const renderSet = (index: number) => {
    const baseClasses = 'h-13 rounded-6 bg-backgrounds-sub flex items-center px-5 mb-2';

    return (
      <div key={index} className={baseClasses}>
        <div>{index + 1}세트</div>
        {exerciseType === '무게와 횟수' && (
          <>
            <input
              type="text"
              placeholder="0"
              className="ml-12 bg-backgrounds-sub w-15 text-right text-lg font-semibold"
            />
            <div className="ml-0.5 mr-0.5">kg</div>
          </>
        )}
        <input
          type="text"
          placeholder="0"
          className={`${exerciseType === '무게와 횟수' ? 'ml-0' : 'ml-12.5'} bg-backgrounds-sub w-15 text-right text-lg font-semibold`}
        />
        <div>{exerciseType === '시간' ? '초' : '회'}</div>
        <Image
          src="/assets/check_gray.svg"
          className="ml-auto"
          alt="check"
          width={24}
          height={24}
        />
      </div>
    );
  };

  const sets = Array.from({ length: set }, (_, index) => renderSet(index));

  return <div className="px-5">{sets}</div>;
};

export default ExerciseTypeSet;
