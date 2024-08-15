import Image from 'next/image';

export default function SocialButton(props: { type: 'google' | 'kakao' }) {
  return (
    <div
      className={`flex justify-center rounded-[6px] h-13 items-center text-base font-medium leading-6 ${props.type === 'google' ? 'bg-[#FFFFFF]' : 'bg-[#FEE500]'}`}
    >
      <Image
        src={`/assets/icon/${props.type}Icon.svg`}
        alt={props.type === 'google' ? '구글 로그인' : '카카오 로그인'}
        width={18}
        height={16.8}
        className="mr-4"
      />
      <span className="text-base font-medium leading-6">
        {props.type === 'google' ? '구글 로그인' : '카카오 로그인'}
      </span>
    </div>
  );
}
