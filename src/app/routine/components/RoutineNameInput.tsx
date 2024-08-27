'use client';
import { Input } from '@/components/ui/input';

const RoutineNameInput = ({
  routineName,
  onChange,
}: {
  routineName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="p-4">
      <Input
        className="h-13 w-full bg-[#292C33] text-base text-white font-semibold border-0 rounded-[6px] placeholder:text-[#777777] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
        placeholder="루틴 이름을 입력하세요"
        value={routineName}
        onChange={onChange}
      />
    </div>
  );
};

export default RoutineNameInput;
