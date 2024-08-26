import PlusRoutineBtn from '@/components/common/PlusRoutineBtn';

export default function NewRoutinePage() {
  return (
    <>
      <div
        className="flex flex-col bg-backgrounds-default text-text-main overflow-hidden"
        style={{ height: 'calc(100vh - 48px)' }}
      >
        하이
      </div>
      <PlusRoutineBtn href="/exercise-list/routine" />
    </>
  );
}
