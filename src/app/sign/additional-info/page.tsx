'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';

type StepInfo = {
  [key: number]: { label: string; message: string };
};

export default function AdditionalInfo() {
  /**
   * 0: 닉네임 (Nickname)
   * 1: 성별 (Gender)
   * 2: 생년월일 (Date of Birth)
   * 3: 키몸무게 (Height and Weight)
   * 4: 골격근체지방 (Skeletal Muscle and Body Fat)
   * @type {number}
   */
  const [step, setStep] = useState(0);

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [boneMineralDensity, setBoneMineralDensity] = useState('');
  const [bodyFatPercentage, setBodyFatPercentage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const maxStep = 5;
  const stepInfo: StepInfo = {
    0: { label: '닉네임을 입력해주세요', message: '한글, 영문, 숫자 3~8자 이내' },
    1: { label: '성별을 선택해주세요', message: '이 정보는 외부에 공개되지 않아요' },
    2: { label: '생년월일을 입력해주세요', message: '이 정보는 외부에 공개되지 않아요' },
    3: { label: '키와 몸무게를 입력해주세요', message: '이 정보는 외부에 공개되지 않아요' },
    4: { label: '골격근량과 체지방을 입력해주세요', message: '이 정보는 외부에 공개되지 않아요' },
  };

  const getStepComponent = (currentStep: number) => {
    const result = [];
    for (let i = 0; i < maxStep; i++) {
      result.push(
        <span key={i}>
          {i === currentStep ? (
            <Image
              src={`/assets/icon/circle_blue.svg`}
              alt="동그라미"
              width={8}
              height={8}
              className="mx-1"
            />
          ) : (
            <Image
              src={`/assets/icon/circle_gray.svg`}
              alt="동그라미"
              width={8}
              height={8}
              className="mx-1"
            />
          )}
        </span>
      );
    }
    return result;
  };

  const changeStep = (direction: 'next' | 'previous') => {
    if (direction === 'next' && step < maxStep - 1) {
      setStep(step + 1);
    } else if (direction === 'previous' && step > 0) {
      setStep(step - 1);
    }
  };

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
          />
        </div>
      )}
      {/* step 1 */}
      {step === 1 && (
        <div className="mt-[80px] flex items-center justify-center gap-4 h-[136px]">
          <div className="w-[152px] h-[136px] bg-[#292C33] rounded-[10px] flex items-center justify-center flex-col">
            <div>남자이미지</div>
            <div className="text-[#999999] text-base font-semibold">남자</div>
          </div>
          <div className="w-[152px] h-[136px] bg-[#292C33] rounded-[10px] flex items-center justify-center flex-col">
            <div>여자이미지</div>
            <div className="text-[#999999] text-base font-semibold">여자</div>
          </div>
        </div>
      )}
      {/* step 2 */}
      {step === 2 && (
        <div className="mt-[112px] flex items-center justify-center gap-4 h-[136px]">
          <Input
            className="h-[68px] w-[152px] bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
            placeholder="연도"
          />
          <Input
            className="h-[68px] bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
            placeholder="월"
          />
          <Input
            className="h-[68px] bg-[#292C33] text-center text-xl text-white font-semibold border-0 rounded-[6px] placeholder:text-[#555555] caret-[#198DF7] focus-visible:ring-offset-[#198DF7]"
            placeholder="일"
          />
        </div>
      )}
      <div className="text-sm leading-[19px] mt-4 text-[#999999] flex-grow">
        {stepInfo[step].message}
      </div>
      <Button className="mb-4" onClick={() => changeStep('next')}>
        다음
      </Button>
    </div>
  );
}
