import Image from 'next/image';
import RoutineDrawerBtn from './RoutineDrawerBtn';

interface DrawerContentProps {
  toggleDrawer: (id: number) => void;
  routineData: any;
  selectedId: number;
  moveRouter: (id: number, type: string) => void;
}

const DrawerContent = ({
  toggleDrawer,
  routineData,
  selectedId,
  moveRouter,
}: DrawerContentProps) => {
  return (
    <>
      <div className="relative">
        <h3 className="text-xl h-16 text-white font-semibold py-5 border-b-[1px] border-b-solid border-backgrounds-light">
          {routineData.routineName}
        </h3>
        <Image
          onClick={() => toggleDrawer(selectedId)}
          className="absolute top-4 right-4 cursor-pointer"
          src="/assets/close.svg"
          width={30}
          height={30}
          alt="닫기"
        />
      </div>
      <div>
        {/* 운동목록 */}
        <div className="bg-backgrounds-default w-full overflow-y-scroll max-h-[320px]">
          {routineData.exercises.map((data: any) => (
            <div
              key={data.routineDetailId}
              className="flex items-center w-full h-[76px] border-b border-backgrounds-default bg-backgrounds-sub pr-6 text-white"
            >
              <Image src={'/assets/exercise_picture.svg'} alt="운동사진" width={76} height={76} />
              {/* <div className="w-[76px]">사진영역</div> */}
              <div className="flex justify-between flex-1 items-center">
                <div className="text-left ml-4 text-md">{data.exerciseName}</div>
                <div className="text-[#999999] min-w-8 text-xs font-normal">{data.sets}세트</div>
              </div>
            </div>
          ))}
        </div>
        {/* 운동 시작버튼 */}
        <div className="flex justify-center w-full px-5 my-4 gap-2">
          <RoutineDrawerBtn
            text="편집"
            width={104}
            height={52}
            backgroundColor="backgrounds-sub"
            onClick={() => moveRouter(selectedId, 'edit')}
          />
          <RoutineDrawerBtn
            text="운동 시작"
            width={208}
            height={52}
            backgroundColor="blue"
            image="/assets/play.svg"
            onClick={() => moveRouter(selectedId, 'progress')}
          />
        </div>
      </div>
    </>
  );
};

export default DrawerContent;
