import Image from 'next/image';
import { ExerciseSet } from '../types';

interface TimeProps {
  exerciseName: string;
  details: string;
  sets: ExerciseSet[];
}

const Time = ({ exerciseName, details, sets }: TimeProps) => {
  return (
    <div className="p-5">
      <div className="flex items-center mb-2">
        <div className="w-15 h-15 items-center justify-center flex">
          <Image width={32} height={32} src={'/assets/heart_on.svg'} alt={'좋아요'} />
        </div>
        <div className="flex flex-col w-full ml-4">
          <div className="text-lg text-text-main font-bold">{exerciseName}</div>
          <div className="text-sm text-text-light">{details}</div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {sets.map((set) => (
          <div
            key={set.setId}
            className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]"
          >
            <p className="text-center text-ssm font-medium mb-2">{set.times}분</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Time;
