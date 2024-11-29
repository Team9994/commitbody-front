import Image from 'next/image';
import React from 'react';

interface ImageUploadProps {
  selectedImage: string | null;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload = ({ selectedImage, handleImageUpload }: ImageUploadProps) => (
  <label
    htmlFor="image-upload"
    className={`flex flex-col justify-center items-center w-[320px] h-[184px] rounded-6 relative ${
      selectedImage ? 'border-blue' : 'border-gray-400'
    } border-[1px] border-dashed cursor-pointer mt-4`}
  >
    {selectedImage ? (
      <Image
        className="rounded-6 overflow-hidden"
        src={selectedImage}
        alt="업로드된 사진"
        fill
        style={{ objectFit: 'cover' }}
      />
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
