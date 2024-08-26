'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import useAdditionalInfo from './hooks/useAdditionalInfo';

export default function AdditionalInfo() {
  const {
    step,
    formData,
    isStepValid,
    systemMessage,
    getStepComponent,
    stepInfo,
    handleInputChange,
    changeStep,
  } = useAdditionalInfo();

  return (
    <div className="bg-[#212227] flex flex-col h-screen px-5">
      <div className="h-12 text-white flex items-center justify-center">
        {getStepComponent(step)}
      </div>
      <div className="mt-4 text-white text-2xl font-semibold leading-[34px]">
        {stepInfo[step].label}
      </div>
      {/* step 0 */}
      {step === 0 && (
        <div className="mt-[112px]">
          <Input
            className="h-[68px] bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
          />
        </div>
      )}

      {/* step 1 */}
      {step === 1 && (
        <div className="mt-[80px] flex items-center justify-center gap-4 h-[136px]">
          <div
            className={`w-[152px] h-[136px] bg-[#292C33] rounded-[10px] flex items-center justify-center flex-col cursor-pointer ${
              formData.gender === 'male' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => handleInputChange('gender', 'male')}
          >
            <Image src="/assets/man.svg" alt="male" width={152} height={96} />
            <div className="text-[#EDEDED] text-base font-semibold">남자</div>
          </div>
          <div
            className={`w-[152px] h-[136px] bg-[#292C33] rounded-[10px] flex items-center justify-center flex-col cursor-pointer ${
              formData.gender === 'female' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => handleInputChange('gender', 'female')}
          >
            <Image src="/assets/woman.svg" alt="female" width={152} height={96} />
            <div className="text-[#EDEDED] text-base font-semibold">여자</div>
          </div>
        </div>
      )}

      {/* step 2 */}
      {step === 2 && (
        <div className="mt-[112px] flex items-center justify-center gap-4">
          <Input
            className="h-[68px] w-[152px] bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
            placeholder="연도"
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
          />
          <Input
            className="h-[68px] bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
            placeholder="월"
            value={formData.month}
            onChange={(e) => handleInputChange('month', e.target.value)}
          />
          <Input
            className="h-[68px] bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
            placeholder="일"
            value={formData.day}
            onChange={(e) => handleInputChange('day', e.target.value)}
          />
        </div>
      )}

      {/* step 3 */}
      {step === 3 && (
        <div className="mt-20 flex items-center justify-center gap-4">
          <div className="relative w-full">
            <div className="text-[#999999] mb-2 text-base font-semibold flex items-center justify-center">
              키
            </div>
            <div className="flex items-center justify-center relative">
              <Input
                className="h-[68px] w-full bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7] pr-12"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999999] text-xl">
                cm
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="text-[#999999] mb-2 text-base font-semibold flex items-center justify-center">
              몸무게
            </div>
            <div className="flex items-center justify-center relative">
              <Input
                className="h-[68px] w-full bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7] pr-12"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999999] text-xl">
                kg
              </span>
            </div>
          </div>
        </div>
      )}

      {/* step 4 */}
      {step === 4 && (
        <div className="mt-20 flex items-center justify-center gap-4">
          <div className="relative w-full">
            <div className="text-[#999999] mb-2 text-base font-semibold flex items-center justify-center">
              골격근량
            </div>
            <div className="flex items-center justify-center relative">
              <Input
                className="h-[68px] w-full bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7] pr-12"
                value={formData.boneMineralDensity}
                onChange={(e) => handleInputChange('boneMineralDensity', e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999999] text-xl">
                kg
              </span>
            </div>
          </div>
          <div className="w-full">
            <div className="text-[#999999] mb-2 text-base font-semibold flex items-center justify-center">
              체지방
            </div>
            <div className="flex items-center justify-center relative">
              <Input
                className="h-[68px] w-full bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7] pr-12"
                value={formData.bodyFatPercentage}
                onChange={(e) => handleInputChange('bodyFatPercentage', e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#999999] text-xl">
                %
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="text-sm leading-[19px] mt-3 text-[#999999] flex-grow">
        {systemMessage ? (
          <div className={`mt-2 ${isStepValid(step) ? 'text-blue' : 'text-red'}`}>
            {systemMessage}
          </div>
        ) : (
          <div className="text-red-500 mt-2">{stepInfo[step].message}</div>
        )}
        {step === 4 && (
          <>
            <div
              className="flex justify-center text-sm leading-[19px] text-blue mt-10"
              onClick={() => changeStep('next')}
            >
              잘 모르겠어요
            </div>
          </>
        )}
      </div>

      <Button className="mb-4" onClick={() => changeStep('next')} disabled={!isStepValid(step)}>
        다음
      </Button>
    </div>
  );
}
