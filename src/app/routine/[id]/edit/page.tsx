import PlusRoutineBtn from '@/components/common/PlusRoutineBtn';
import RoutineEdit from './hydrated-page';

const HydratedRoutineEdit = () => {
  return (
    <div
      className="flex flex-col bg-backgrounds-default text-text-main overflow-hidden"
      style={{ height: 'calc(100vh - 48px)' }}
    >
      <RoutineEdit />
    </div>
  );
};

export default HydratedRoutineEdit;
