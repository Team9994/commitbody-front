import { Button } from '@/components/ui/button';

const AddExerciseBtn = () => {
  return (
    <div className="fixed bottom-4 left-4 z-90 rounded-[16px] w-14 h-14 flex items-center justify-center cursor-pointer">
      <Button className="mb-4">운동 추가하기</Button>
    </div>
  );
};

export default AddExerciseBtn;
