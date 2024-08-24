import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // 추가

type STEP_INFO = {
  [key: number]: {
    key: string;
    label: string;
    message: string;
    success: string;
    error: { [key: string]: string };
  };
};

const useAdditionalInfo = () => {
  const router = useRouter();
  /**
   * 0: 닉네임 (Nickname)
   * 1: 성별 (Gender)
   * 2: 생년월일 (Date of Birth)
   * 3: 키몸무게 (Height and Weight)
   * 4: 골격근체지방 (Skeletal Muscle and Body Fat)
   * @type {number}
   */
  const [step, setStep] = useState<number>(0);
  const { data: session } = useSession();

  // 유효성 검사 규칙 정의
  const VALIDATION_RULES = {
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

  const [formData, setFormData] = useState<{
    nickname: string;
    gender: string;
    year: string;
    month: string;
    day: string;
    height: string;
    weight: string;
    boneMineralDensity: string;
    bodyFatPercentage: string;
  }>({
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

  const isStepValid = (currentStep: number): boolean => {
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

  const [systemMessage, setSystemMessage] = useState<string>('');
  const MAX_STEPS = 5;
  const handleInputChange = async (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // 닉네임 검증
    // 닉네임 검증
    if (field === 'nickname') {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/api/v1/register-nickname`,
          { nickname: value },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        console.log(res.data.success);
        setSystemMessage(res.data.message);
        if (res.data.success) {
          setIsValid((prevIsValid) => ({
            ...prevIsValid,
            nickname: true,
          }));
        }
      } catch (error) {
        console.error('닉네임 검증 중 오류 발생:', error);
        console.log(error.response.data.message.nickname);
        let errorMessage = '';
        setIsValid((prevIsValid) => ({
          ...prevIsValid,
          nickname: false,
        }));
        setSystemMessage(error.response.data.message.nicknamessage);
      }
      return;
    }

    // 유효성 검사 수행
    const rule = VALIDATION_RULES[field as keyof typeof VALIDATION_RULES];
    const isFieldValid = typeof rule === 'function' ? rule(value) : false;

    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      [field]: isFieldValid,
    }));

    setSystemMessage(isFieldValid ? stepInfo[step].success : stepInfo[step].error[field]);
  };

  const getStepComponent = (currentStep: number) => {
    const result = [];
    for (let i = 0; i < MAX_STEPS; i++) {
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
  const stepInfo: STEP_INFO = {
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
  const changeStep = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      if (step < MAX_STEPS - 1) {
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
    router.push('/');
  };

  return {
    step,
    formData,
    handleInputChange,
    changeStep,
    handleSubmit,
    getStepComponent,
    stepInfo,
    systemMessage,
    isValid,
    isStepValid,
  };
};

export default useAdditionalInfo;
