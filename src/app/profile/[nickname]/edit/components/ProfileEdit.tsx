'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserProfile } from '../../components/UserInfo';
import Header from '@/components/layouts/Header';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/app/api/profile';
import plus from './../../../../../../public/assets/plus.svg';

const ProfileEdit = ({ userInfo }: { userInfo: UserProfile | null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: '',
    gender: 'MALE',
    birthday: ['2000', '01', '01'],
    height: '',
    weight: '',
    bodyFatPercentage: 0,
    boneMineralDensity: 0,
  });
  const [profileImage, setProfileImage] = useState<File | null>(null); // For uploading the profile image
  const [previewImage, setPreviewImage] = useState<string | null>(null); // For previewing the selected image

  useEffect(() => {
    if (userInfo) {
      setFormData({
        nickname: userInfo.memberDto.nickname || '',
        gender: userInfo.memberDto.gender || 'MALE',
        birthday: userInfo.memberDto.birthday
          ? userInfo.memberDto.birthday.split('-')
          : ['2000', '01', '01'],
        height: userInfo.memberDto.height || '',
        weight: userInfo.memberDto.weight || '',
        bodyFatPercentage: userInfo.memberDto.bodyFatPercentage || 0,
        boneMineralDensity: userInfo.memberDto.boneMineralDensity || 0,
      });
      setPreviewImage(userInfo.memberDto.profile || '/default-profile.png'); // Set initial profile image
    }
  }, [userInfo]);

  const handleChange = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleSave = async () => {
    const profileUpdateRequest = {
      nickname: formData.nickname,
      gender: formData.gender as 'MALE' | 'FEMALE', // Explicitly cast gender
      birthDay: formData.birthday.join('-'),
      height: formData.height,
      weight: formData.weight,
      bodyFatPercentage: formData.bodyFatPercentage,
      boneMineralDensity: formData.boneMineralDensity,
      deleteProfile: false,
    };

    try {
      const response = await updateUserProfile(profileUpdateRequest, profileImage);
      if (response) {
        alert('프로필이 성공적으로 업데이트되었습니다.');
        router.back();
      } else {
        alert('프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <header className="flex items-center flex-col">
        <Header
          className="bg-backgrounds-default w-full mb-5"
          left={
            <div
              onClick={() => {
                router.back();
              }}
            >
              <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={24} height={24} />
            </div>
          }
          center={<h4 className="text-xl font-semibold leading-7 text-text-main">프로필 수정</h4>}
          right={
            <span onClick={handleSave} className="font-bold text-blue text-base cursor-pointer">
              저장
            </span>
          }
        />
        <div className="relative">
          {/* Profile Image */}
          <Image
            src={previewImage || '/default-profile.png'}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full cursor-pointer"
          />

          {/* Clickable input for changing the image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {/* "+" Icon */}
          <div className="cursor-point absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 flex items-center justify-center w-6 h-6 z-10">
            <Image
              src={'/assets/plus.svg'}
              alt="플러스 버튼"
              width={30}
              height={30}
              className="text-black font-bold cursor-point"
            />
          </div>
        </div>
      </header>
      <form className="space-y-6 flex-grow overflow-y-auto">
        <div className="space-y-2">
          <label htmlFor="nickname" className="text-sm text-gray-400">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={formData.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
            className="w-full bg-backgrounds-sub p-3 rounded-md h-[52px] focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-400">성별</span>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => handleChange('gender', 'MALE')}
              className={`flex-1 p-3 rounded-md h-[52px] ${
                formData.gender === 'MALE'
                  ? 'border border-blue text-blue'
                  : 'border-gray-400 text-text-placeholder'
              }`}
            >
              남자
            </button>
            <button
              type="button"
              onClick={() => handleChange('gender', 'FEMALE')}
              className={`flex-1 p-3 rounded-md h-[52px] ${
                formData.gender === 'FEMALE'
                  ? 'border border-blue text-blue'
                  : 'border-gray-400 text-text-placeholder'
              }`}
            >
              여자
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-400">생년월일</span>
          <div className="flex space-x-2">
            <input
              type="number"
              value={formData.birthday[0]}
              placeholder="1999"
              onChange={(e) =>
                handleChange('birthday', [
                  e.target.value,
                  formData.birthday[1],
                  formData.birthday[2],
                ])
              }
              className="flex-1 bg-backgrounds-sub p-2 rounded-md text-sm w-1/2 h-[52px] focus:outline-none"
            />
            <input
              type="number"
              value={formData.birthday[1]}
              placeholder="12"
              onChange={(e) =>
                handleChange('birthday', [
                  formData.birthday[0],
                  e.target.value,
                  formData.birthday[2],
                ])
              }
              className=" bg-backgrounds-sub w-1/4 p-2 rounded-md text-sm h-[52px] focus:outline-none"
            />
            <input
              type="number"
              value={formData.birthday[2]}
              placeholder="10"
              onChange={(e) =>
                handleChange('birthday', [
                  formData.birthday[0],
                  formData.birthday[1],
                  e.target.value,
                ])
              }
              className=" bg-backgrounds-sub w-1/4 p-2 rounded-md text-sm h-[52px] focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="height" className="text-sm text-gray-400">
              키(cm)
            </label>
            <input
              type="number"
              id="height"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              className="w-full bg-backgrounds-sub p-3 rounded-md h-[52px] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="weight" className="text-sm text-gray-400">
              몸무게(kg)
            </label>
            <input
              type="number"
              id="weight"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              className="w-full bg-backgrounds-sub p-3 rounded-md h-[52px] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="muscle" className="text-sm text-gray-400">
              골격근량(kg)
            </label>
            <input
              type="number"
              id="muscle"
              value={formData.boneMineralDensity}
              onChange={(e) => handleChange('boneMineralDensity', e.target.value)}
              className="w-full bg-backgrounds-sub p-3 rounded-md h-[52px] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="fat" className="text-sm text-gray-400">
              체지방률(%)
            </label>
            <input
              type="number"
              id="fat"
              value={formData.bodyFatPercentage}
              onChange={(e) => handleChange('bodyFatPercentage', e.target.value)}
              className="w-full bg-backgrounds-sub p-3 rounded-md h-[52px] focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
