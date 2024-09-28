import { auth } from '@/auth';
interface RoutineProgressProps {
  routineId: string;
}

const RoutineProgress = async ({ routineId }: RoutineProgressProps) => {
  const session = await auth();
  console.log(routineId);
  // const routineId = params.id;
  // console.log('Routine ID:', routineId);

  return <div>RoutineProgress</div>;
};

export default RoutineProgress;
