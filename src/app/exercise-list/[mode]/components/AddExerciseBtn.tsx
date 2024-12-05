import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const AddExerciseBtn = ({
  count,
  routines,
  deleteRoutine,
}: {
  count: number;
  routines: [];
  deleteRoutine: (id: number) => void;
}) => {
  return (
    <div className="bg-backgrounds-sub max-w-[500px] w-full  h-[124px] px-4 fixed bottom-0 z-90 rounded-6 flex items-center justify-center flex-col">
      <div className="mb-4 w-full overflow-x-auto h-[20px] flex items-center">
        <div className="flex whitespace-nowrap">
          {routines.map((routine: any) => (
            <div
              key={routine.id}
              className="flex items-center text-xs leading-[18px] shrink-0 mr-2"
            >
              <span className="">{routine.name}</span>
              <Image
                src="/assets/close_gray_btn.svg"
                alt="close"
                width={20}
                height={20}
                onClick={() => deleteRoutine(routine.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <Button asChild className="w-full bottom-2">
        <Link href="/routine/new">{count}개의 운동 추가하기</Link>
      </Button>
    </div>
  );
};

export default AddExerciseBtn;
