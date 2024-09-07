import Image from 'next/image';

const CompleteExerciseList = () => {
  return (
    <>
      <div className="flex flex-col overflow-y-scroll pt-[162px]">
        {/* 횟수와 중량 */}
        <div className=" p-5">
          <div className="flex items-center mb-2">
            <div className="w-15 h-15 items-center justify-center flex">
              <Image width={32} height={32} src={'/assets/heart_on.svg'} alt={'좋아요'} />
            </div>
            <div className="flex flex-col w-full ml-4">
              <div className="text-lg text-text-main font-bold left-0">시티드 덤벨 숄더 프레스</div>
              <div className="text-sm text-text-light">5세트 • 50회 • 250kg • 1rm : 10kg</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[72px]">
              <p className="text-center text-ssm font-medium mb-2">5kg</p>
              <div className="border-b border-backgrounds-light border w-full"></div>
              <p className="text-center text-ssm font-medium mt-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[72px]">
              <p className="text-center text-ssm font-medium mb-2">5kg</p>
              <div className="border-b border-backgrounds-light border w-full"></div>
              <p className="text-center text-ssm font-medium mt-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[72px]">
              <p className="text-center text-ssm font-medium mb-2">5kg</p>
              <div className="border-b border-backgrounds-light border w-full"></div>
              <p className="text-center text-ssm font-medium mt-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[72px]">
              <p className="text-center text-ssm font-medium mb-2">5kg</p>
              <div className="border-b border-backgrounds-light border w-full"></div>
              <p className="text-center text-ssm font-medium mt-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[72px]">
              <p className="text-center text-ssm font-medium mb-2">5kg</p>
              <div className="border-b border-backgrounds-light border w-full"></div>
              <p className="text-center text-ssm font-medium mt-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[72px]">
              <p className="text-center text-ssm font-medium mb-2">5kg</p>
              <div className="border-b border-backgrounds-light border w-full"></div>
              <p className="text-center text-ssm font-medium mt-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[72px]">
              <p className="text-center text-ssm font-medium mb-2">5kg</p>
              <div className="border-b border-backgrounds-light border w-full"></div>
              <p className="text-center text-ssm font-medium mt-2">10회</p>
            </div>
          </div>
        </div>
        {/* 횟수 */}
        <div className=" p-5">
          <div className="flex items-center mb-2">
            <div className="w-15 h-15 items-center justify-center flex">
              <Image width={32} height={32} src={'/assets/heart_on.svg'} alt={'좋아요'} />
            </div>
            <div className="flex flex-col w-full ml-4">
              <div className="text-lg text-text-main font-bold left-0">시티드 덤벨 숄더 프레스</div>
              <div className="text-sm text-text-light">5세트 • 50회 • 250kg • 1rm : 10kg</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">10회</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">10회</p>
            </div>
          </div>
        </div>
        {/* 시간 */}
        <div className=" p-5">
          <div className="flex items-center mb-2">
            <div className="w-15 h-15 items-center justify-center flex">
              <Image width={32} height={32} src={'/assets/heart_on.svg'} alt={'좋아요'} />
            </div>
            <div className="flex flex-col w-full ml-4">
              <div className="text-lg text-text-main font-bold left-0">시티드 덤벨 숄더 프레스</div>
              <div className="text-sm text-text-light">5세트 • 50회 • 250kg • 1rm : 10kg</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
          </div>
        </div>
        {/* 시간 */}
        <div className=" p-5">
          <div className="flex items-center mb-2">
            <div className="w-15 h-15 items-center justify-center flex">
              <Image width={32} height={32} src={'/assets/heart_on.svg'} alt={'좋아요'} />
            </div>
            <div className="flex flex-col w-full ml-4">
              <div className="text-lg text-text-main font-bold left-0">시티드 덤벨 숄더 프레스</div>
              <div className="text-sm text-text-light">5세트 • 50회 • 250kg • 1rm : 10kg</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
            <div className="flex flex-col bg-backgrounds-sub rounded-6 items-center justify-center h-[34px]">
              <p className="text-center text-ssm font-medium mb-2">00:15</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteExerciseList;
