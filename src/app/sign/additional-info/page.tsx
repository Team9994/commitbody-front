'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';

type StepInfo = {
  [key: number]: {
    key: string;
    label: string;
    message: string;
    success: string;
    error: { [key: string]: string };
  };
};

// 유효성 검사 규칙 정의
const validationRules = {
  nickname: (value: string) => value.length >= 3 && value.length <= 8,
  gender: (value: string) => ['male', 'female'].includes(value),
  year: (value: string) => /^\d{4}$/.test(value),
  month: (value: string) => /^(0?[1-9]|1[0-2])$/.test(value),
  day: (value: string) => /^(0?[1-9]|[12][0-9]|3[01])$/.test(value),
  height: (value: string) => /^\d{2,3}(\.\d)?$/.test(value),
  weight: (value: string) => /^\d{2,3}(\.\d)?$/.test(value),
  boneMineralDensity: (value: string) => /^\d{1,2}(\.\d)?$/.test(value),
  bodyFatPercentage: (value: string) => /^\d{1,2}(\.\d)?$/.test(value),
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
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    nickname: '',
    gender: '',
    year: '',
    month: '',
    day: '',
    height: '',
    weight: '',
    boneMineralDensity: '',
    bodyFatPercentage: '',
  });

  const [isValid, setIsValid] = useState({
    nickname: false,
    gender: false,
    year: false,
    month: false,
    day: false,
    height: false,
    weight: false,
    boneMineralDensity: false,
    bodyFatPercentage: false,
  });

  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return isValid.nickname;
      case 1:
        return isValid.gender;
      case 2:
        return isValid.year && isValid.month && isValid.day;
      case 3:
        return isValid.height && isValid.weight;
      case 4:
        return isValid.boneMineralDensity && isValid.bodyFatPercentage;
      default:
        return false;
    }
  };

  const [systemMessage, setSystemMessage] = useState<String>('');
  const maxStep = 5;
  const stepInfo: StepInfo = {
    0: {
      key: 'nickname',
      label: '닉네임을 입력해주세요',
      message: '한글, 영문, 숫자 3~8자 이내',
      success: '멋진 닉네임이예요!',
      error: {
        nickname: '유효하지 않은 닉네임입니다.',
      },
    },
    1: {
      key: 'gender',
      label: '성별을 선택해주세요',
      message: '이 정보는 외부에 공개되지 않아요',
      success: '',
      error: {
        gender: '성별을 선택해주세요.',
      },
    },
    2: {
      key: 'birth',
      label: '생년월일을 입력해주세요',
      message: '이 정보는 외부에 공개되지 않아요',
      success: '',
      error: {
        year: '유효하지 않은 연도입니다.',
        month: '유효하지 않은 월입니다.',
        day: '유효하지 않은 일입니다.',
      },
    },
    3: {
      key: 'height',
      label: '키와 몸무게를 입력해주세요',
      message: '이 정보는 외부에 공개되지 않아요',
      success: '',
      error: {
        height: '유효하지 않은 키입니다.',
        weight: '유효하지 않은 몸무게입니다.',
      },
    },
    4: {
      key: 'boneMineralDensity',
      label: '골격근량과 체지방률을 입력해주세요',
      message: '이 정보는 외부에 공개되지 않아요',
      success: '',
      error: {
        boneMineralDensity: '유효하지 않은 골격근량입니다.',
        bodyFatPercentage: '유효하지 않은 체지방률입니다.',
      },
    },
  };

  const handleInputChange = async (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // 닉네임 검증
    if (field === 'nickname') {
      console.log(process.env.NEXT_PUBLIC_SPRING_BACKEND_URL);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/api/v1/register-nickname`,
        { nickname: value },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setSystemMessage(res.data.message);
      if (res.data.success) {
        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          nickname: true,
        }));
      }
      return;
    }

    // 유효성 검사 수행
    const rule = validationRules[field as keyof typeof validationRules];
    const isFieldValid = typeof rule === 'function' ? rule(value) : false;

    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      [field]: isFieldValid,
    }));

    setSystemMessage(isFieldValid ? stepInfo[step].success : stepInfo[step].error[field]);
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
    if (direction === 'next') {
      if (step < maxStep - 1) {
        setSystemMessage('');
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    } else if (direction === 'previous' && step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    const transformedData = {
      nickName: formData.nickname,
      gender: formData.gender.toUpperCase(),
      birthday: `${formData.year}-${formData.month.padStart(2, '0')}-${formData.day.padStart(2, '0')}`,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      boneMineralDensity: parseFloat(formData.boneMineralDensity),
      bodyFatPercentage: parseFloat(formData.bodyFatPercentage),
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/api/v1/additional-info`,
      transformedData,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
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
            <div>남자이미지</div>
            <div className="text-[#999999] text-base font-semibold">남자</div>
          </div>
          <div
            className={`w-[152px] h-[136px] bg-[#292C33] rounded-[10px] flex items-center justify-center flex-col cursor-pointer ${
              formData.gender === 'female' ? 'border-2 border-blue-500' : ''
            }`}
            onClick={() => handleInputChange('gender', 'female')}
          >
            <div>여자이미지</div>
            <div className="text-[#999999] text-base font-semibold">여자</div>
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
          <div className="flex justify-center text-sm leading-[19px] text-blue mt-10">
            잘 모르겠어요
          </div>
        )}
      </div>

      <Button className="mb-4" onClick={() => changeStep('next')} disabled={!isStepValid(step)}>
        다음
      </Button>
    </div>
  );
}
