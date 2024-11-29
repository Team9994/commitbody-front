import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface ImageUploadProps {
  selectedImage: string | null;
  handleDrawerToggle: () => void;
}

const ImageUpload = ({ handleDrawerToggle, selectedImage }: ImageUploadProps) => {
  const searchParams = useSearchParams();
  const cur = searchParams.get('cur');
  return (
    <div
      onClick={handleDrawerToggle}
      className={`flex flex-col justify-center items-center w-full h-[200px] relative cursor-pointer mt-4 border-b border-backgrounds-light`}
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
        <div className="flex flex-col items-center text-[#777777]">
          <Image src="/assets/camera.svg" alt="이미지 업로드" width={40} height={40} />
          <span className="mt-1 mb-4  text-sm">0 / 1</span>
          {cur === 'certification' && (
            <p className="text-xs">운동 인증은 사진이나 영상을 필수로 등록해야돼요</p>
          )}
        </div>
      )}
      \
    </div>
  );
};
export default ImageUpload;
