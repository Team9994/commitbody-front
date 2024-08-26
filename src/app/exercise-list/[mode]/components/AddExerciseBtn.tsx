import { Button } from '@/components/ui/button';
import Image from 'next/image';

const AddExerciseBtn = ({
  count,
  routines,
  deleteRoutine,
}: {
  count: number;
  routines: [];
  deleteRoutine: (id: number) => void;
}) => {
  console.log(count);
  console.log(routines);
  return (
    <div className="bg-backgrounds-sub w-full h-[124px] px-4 fixed bottom-0 z-90 rounded-6 flex items-center justify-center flex-col">
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
      <Button className="w-full bottom-2">{count}개의 운동 추가하기</Button>
    </div>
  );
};

export default AddExerciseBtn;
