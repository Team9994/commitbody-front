import { auth } from '@/auth';
import ProgressRoutineList from '@/app/routine/[id]/progress/components/ProgressRoutineList';
import { getRoutineDetail } from '@/app/api/routine';
interface RoutineProgressProps {
  routineId: string;
}

const RoutineProgress = async ({ routineId }: RoutineProgressProps) => {
  const session = await auth();
  // console.log(routineId);
  // const routineId = params.id;
  // console.log('Routine ID:', routineId);

  const response = await getRoutineDetail(routineId);
  const routineDetails = response?.data?.routineDtos[0];

  // console.log(routineDetails.exercises);
  return (
    <div>
      <ProgressRoutineList routineDetails={routineDetails} />
    </div>
  );
};

export default RoutineProgress;
