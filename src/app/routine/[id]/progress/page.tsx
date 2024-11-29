import RoutineProgress from '@/app/routine/[id]/progress/hydrated-page';

interface RoutineProgressProps {
  params: { id: string };
}

const HydratedRoutineProgress = ({ params }: RoutineProgressProps) => {
  const routineId = params.id;
  // console.log(params.id);
  return (
    <div className="flex flex-col text-text-main overflow-hidden bg-backgrounds-default">
      <RoutineProgress routineId={routineId} />
    </div>
  );
};

export default HydratedRoutineProgress;
