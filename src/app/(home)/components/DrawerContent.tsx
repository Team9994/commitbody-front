import Image from 'next/image';
import RoutineDrawerBtn from './RoutineDrawerBtn';

interface DrawerContentProps {
  toggleDrawer: (id: number) => void;
  routineData: {};
  selectedId: number;
}

const DrawerContent = ({ toggleDrawer, routineData, selectedId }: DrawerContentProps) => {
  console.log(routineData);
  // {
  //   id: 1,
  //   title: '무분할 상체 루틴',
  //   parts: ['가슴', '등', '어깨', '삼두'],
  //   exercises: [
  //     {
  //       exerciseId: 1,
  //       exerciseName: '3/4 싯업',
  //       gifUrl: 'https://v2.exercisedb.io/image/oAVJS-wlSfNhXd',
  //       exerciseType: '횟수',
  //       sets: 4,
  //       orders: 1,
  //       routineSets: [
  //         {
  //           setsId: 105,
  //           sets: 1,
  //         },
  //       ],
  //     },
  //     {
  //       exerciseId: 2,
  //       exerciseName: '커스텀운동명',
  //       gifUrl: 'http://example.com/pushup.gif',
  //       exerciseType: '무게와 횟수',
  //       sets: 4,
  //       orders: 2,
  //       routineSets: [
  //         {
  //           setsId: 105,
  //           sets: 2,
  //         },
  //       ],
  //     },
  //   ],
  // },
  return (
    <>
      <div className="relative">
        <h3 className="text-xl h-16 text-white font-semibold py-5 border-b-[1px] border-b-solid border-backgrounds-light">
          {routineData.title}
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
              key={data.id}
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
          <RoutineDrawerBtn text="편집" width={104} height={52} backgroundColor="backgrounds-sub" />
          <RoutineDrawerBtn
            text="운동 시작"
            width={208}
            height={52}
            backgroundColor="blue"
            image="/assets/play.svg"
          />
        </div>
      </div>
    </>
  );
};

export default DrawerContent;
