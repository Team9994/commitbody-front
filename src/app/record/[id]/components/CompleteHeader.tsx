import Image from 'next/image';
import Link from 'next/link';
interface RoutineCompleteHeaderProps {
  recordName: string;
  startDate: string;
  durationTime: string;
  recordVolume: number;
  recordSets: number;
  recordCalorie: number;
}

const RoutineCompleteHeader = ({
  recordName,
  startDate,
  durationTime,
  recordVolume,
  recordSets,
  recordCalorie,
}: RoutineCompleteHeaderProps) => {
  const headerClass = 'flex justify-center items-center';
  const textMainClass = 'text-text-main font-semibold';
  const textLightClass = 'text-xs text-text-light font-normal';

  const StatItem = ({ label, value, unit }: { label: string; value: number; unit: string }) => (
    <div className="flex flex-col w-1/4 items-center">
      <div className="text-xs text-text-sub font-normal">{label}</div>
      <div className={`text-lg ${textMainClass}`}>
        {value}
        <span className="text-ssm text-text-sub font-medium">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-10 h-[162px] bg-gradient-to-b from-[#2B3F58] to-[#212227]">
      {/* 헤더영역 */}
      <div className={`${headerClass} h-12`}>
        <div className="absolute left-5">
          <Link href="/">
            <Image priority src={'/assets/back.svg'} alt={'뒤로가기'} width={28} height={28} />
          </Link>
        </div>
        <div className={`text-xl ${textMainClass}`}>{recordName}</div>
        <div className="absolute right-5">
          <Image priority src={'/assets/dot3.svg'} alt={'더보기'} width={28} height={28} />
        </div>
      </div>
      {/* 시간영역 */}
      <div className={headerClass}>
        <div className={textLightClass}>{startDate}</div>
        <div className={`${textLightClass} mx-1`}> · </div>
        <div className={textLightClass}>{durationTime}</div>
      </div>
      {/* 박스영역 */}
      <div className="px-5 py-3 h-[88px]">
        <div className="rounded-6 bg-[#324151] h-16 flex items-center">
          <StatItem
            label="운동시간"
            value={
              Number(durationTime.split('~')[1].split(':')[0]) -
              Number(durationTime.split('~')[0].split(':')[0])
            }
            unit="분"
          />
          <StatItem label="볼륨" value={recordVolume} unit="kg" />
          <StatItem label="세트" value={recordSets} unit="set" />
          <StatItem label="칼로리" value={recordCalorie} unit="kcal" />
        </div>
      </div>
    </div>
  );
};

export default RoutineCompleteHeader;
