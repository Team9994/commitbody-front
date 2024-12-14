import Image from 'next/image';
import ExerciseTypeSet from './ExerciseTypeSet';
import SetCountAdjustBtn from './SetCountAdjustBtn';
interface RoutineSet {
  setsId: number;
  sets: number;
  kg?: number;
}

interface RoutineItem {
  routineDetailId: number;
  exerciseId: number;
  source: string;
  exerciseName: string;
  gifUrl: string;
  exerciseType: string;
  sets: number;
  orders: number;
  routineSets: RoutineSet[];
}

const SelectedRoutineList = ({ routines }: { routines: RoutineItem[] }) => {
  console.log(routines);
  return (
    <div
      className="bg-backgrounds-default w-full overflow-y-scroll"
      style={{ height: 'calc(100vh - 148px - 20px)' }}
    >
      {routines?.map((list: RoutineItem) => (
        <>
          <div
            key={list.routineDetailId}
            className={`flex items-center w-full h-[76px] border-b border-backgrounds-default cursor-pointer pr-6 `}
          >
            <Image
              className="ml-5"
              src={'/assets/heart_on.svg'}
              alt={list.exerciseName}
              width={32}
              height={32}
            />
            <span className="flex-1 ml-4">{list.exerciseName}</span>

            <Image
              className="ml-5"
              src={'/assets/dot3.svg'}
              alt={list.exerciseName}
              width={24}
              height={24}
            />
          </div>
          <ExerciseTypeSet
            routineDetailId={list.routineDetailId}
            exerciseType={list.exerciseType}
            set={list.sets}
          />
          <div className="flex">
            <SetCountAdjustBtn type="delete" onClick={() => {}} />
            <SetCountAdjustBtn type="add" onClick={() => {}} />
          </div>
        </>
      ))}
    </div>
  );
};

export default SelectedRoutineList;
