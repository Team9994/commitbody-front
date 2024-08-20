import Image from 'next/image';
import React from 'react';

const ImageUpload = ({
  selectedImage,
  handleImageUpload,
}: {
  selectedImage: string | null;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label
    htmlFor="image-upload"
    className={`flex flex-col justify-center items-center w-[320px] h-[184px] ${
      selectedImage ? 'border-blue' : 'border-gray-400'
    } border-[1px] border-dashed cursor-pointer mt-4`}
  >
    {selectedImage ? (
      <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
    ) : (
      <div className="flex">
        <Image src="/assets/picture.svg" alt="이미지 업로드" width={40} height={40} />
        <span className="ml-2 mt-2 text-gray-600">운동 모션 사진 추가</span>
      </div>
    )}
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
    />
  </label>
);
export default ImageUpload;
