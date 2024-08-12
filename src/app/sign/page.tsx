import SocialButton from '@/components/ui/SocialButton';

export default function Sign() {
  return (
    <div className="flex flex-col h-screen bg-[#212227]">
      <div className="flex-grow overflow-auto">
        <div className="p-4 font-semibold text-[28px] text-white pt-[90px]">
          커밋바디에 오신것을
          <br />
          환영합니다.
        </div>
      </div>
      <div className="text-white px-5 text-xs font-normal leading-[18px] mb-7">
        <p>로그인하시면 아래 내용에 동의한 것으로 간주합니다.</p>
        <p>
          <span className="underline">개인정보 처리방침</span> |{' '}
          <span className="underline">이용약관</span>
        </p>
      </div>
      <div className="pb-10 px-5 gap-3 flex flex-col">
        <SocialButton type="google" />
        <SocialButton type="kakao" />
      </div>
    </div>
  );
}
