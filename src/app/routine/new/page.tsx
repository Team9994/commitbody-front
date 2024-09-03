import RoutineNew from './hydrated-page';

const HydratedRoutineNew = () => {
  return (
    <div
      className="flex flex-col bg-backgrounds-default text-text-main overflow-hidden"
      style={{ height: 'calc(100vh - 48px)' }}
    >
      <RoutineNew />
    </div>
  );
};

export default HydratedRoutineNew;
