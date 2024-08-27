import PlusRoutineBtn from '@/components/common/PlusRoutineBtn';
import RoutineNew from './hydrated-page';

export default function HydratedRoutineNew() {
  return (
    <div
      className="flex flex-col bg-backgrounds-default text-text-main overflow-hidden"
      style={{ height: 'calc(100vh - 48px)' }}
    >
      <RoutineNew />
      <PlusRoutineBtn href="/exercise-list/routine" />
    </div>
  );
}
