import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DayContentProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useEffect } from 'react';

const formatCaption = (date: Date) => {
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}.`;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  data: any;
  curYear: number;
  curMonth: number;
  moveMonth: (direction: 'Left' | 'Right') => void;
  handleMultipleRoutinesClick: (data: any) => void;
  handleSingleRoutineClick: (data: any) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  data,
  curYear,
  curMonth,
  moveMonth,
  handleMultipleRoutinesClick,
  handleSingleRoutineClick,
  ...props
}: CalendarProps) {
  const today = new Date();
  const [routineDays, setRoutineDays] = React.useState<Date[]>([]);

  // curYear와 curMonth가 변경될 때마다 routineDays를 업데이트합니다.
  useEffect(() => {
    // 현재 년도와 월에 맞는 루틴 데이터를 계산합니다.
    const recordDayCounts: Record<number, number> = {};

    // 현재 연도와 월에 맞는 recordDays만 필터링하여 recordDayCounts를 업데이트합니다.
    Object.entries(data?.dayRecordCount || {}).forEach(([dayKey, records]) => {
      const dayOfRecords: any = records;
      const recordDate = new Date(dayOfRecords.day);

      // 현재 연도와 월이 일치하는 경우에만 recordDayCounts에 값을 추가합니다.
      if (recordDate.getFullYear() === curYear && recordDate.getMonth() + 1 === curMonth) {
        recordDayCounts[parseInt(dayKey)] = dayOfRecords.recordDays.length;
      }
    });

    // 현재 연도와 월에 맞는 루틴 날짜를 계산하여 상태로 설정합니다.
    const updatedRoutineDays = Object.keys(recordDayCounts)
      .map((day) => new Date(curYear, curMonth - 1, parseInt(day))) // `curMonth - 1`로 수정하여 Date 객체에 올바른 월 전달
      .filter((date) => date.getDate() !== today.getDate()); // 오늘 날짜 제외

    setRoutineDays(updatedRoutineDays); // 상태로 설정하여 렌더링을 트리거합니다.
  }, [curYear, curMonth, data?.dayRecordCount]);

  const modifiers = {
    routineDays, // 루틴이 있는 날짜
    today: [today], // 오늘 날짜
  };

  // 점의 위치를 조정하는 함수
  const dotStyles = (index: number, count: number) => {
    const spacing = 8; // 점 간의 간격 설정
    const baseOffset = ((count - 1) * spacing) / 2; // 중앙을 기준으로 좌우로 균등하게 배치

    return {
      left: `calc(50% - ${baseOffset}px + ${index * spacing}px)`, // 중앙을 기준으로 점들을 균등하게 배치
      transform: 'translateX(-50%)',
    };
  };

  // 날짜 클릭 이벤트 핸들러
  const handleDayClick = (date: Date) => {
    const dayKey = date.getDate();
    console.log(data);

    // 날짜 데이터가 존재하는지 안전하게 확인 후 길이를 계산합니다.
    const dotCount = data?.dayRecordCount?.[dayKey]?.recordDays?.length || 0;

    if (dotCount >= 2) {
      handleMultipleRoutinesClick(data?.dayRecordCount?.[dayKey]?.recordDays);
    } else if (dotCount === 1) {
      handleSingleRoutineClick(data?.dayRecordCount?.[dayKey]?.recordDays);
    }
  };

  const renderDots = (date: Date) => {
    const dayKey = date.getDate();
    const dotCount = data?.dayRecordCount?.[dayKey]?.recordDays?.length || 0;

    return (
      <div className="relative flex justify-center items-center">
        {Array(dotCount)
          .fill('')
          .map((_, index) => (
            <div
              key={index}
              className={`w-[5px] h-[5px] bg-backgrounds-blue rounded-lg absolute`}
              style={{
                top: `-5px`,
                ...dotStyles(index, dotCount),
                zIndex: 20,
              }}
            />
          ))}
      </div>
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ko}
      className={cn(
        'w-80 pt-4 pb-6 rounded-16 bg-backgrounds-sub flex justify-center items-center text-white',
        className
      )}
      classNames={{
        months: 'w-full flex flex-col space-y-4',
        month: 'space-y-4',
        caption: 'flex justify-center items-center pt-1 relative',
        caption_label: 'text-lg font-medium text-white',
        nav: 'flex items-center gap-2 justify-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-5 w-5 p-0 text-white bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent'
        ),
        nav_button_previous: 'absolute left-20',
        nav_button_next: 'absolute right-20',
        table: 'w-full flex flex-col items-center justify-center border-collapse',
        head_row: 'flex',
        head_cell: 'text-[#EDEDED] w-11 text-center font-normal text-xs',
        row: 'flex w-full',
        cell: 'h-11 w-11 text-center p-0 relative',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-11 w-11 p-[12px] font-normal text-[#999999] focus:text-blue rounded-full aria-selected:bg-transparent active:bg-transparent focus:bg-transparent hover:bg-transparent relative'
        ),
        day_selected: 'bg-blue-500 text-[#EDEDED] rounded-full',
        day_today: 'text-blue-400 font-semibold',
        day_outside: 'hidden',
        day_disabled: 'text-gray-500 opacity-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: (props) => (
          <ChevronLeft
            {...props}
            className="h-5 w-5 text-white cursor-pointer"
            onClick={() => moveMonth('Left')} // 왼쪽 버튼 클릭 시 moveMonth("Left") 호출
          />
        ),
        IconRight: (props) => (
          <ChevronRight
            {...props}
            className="h-5 w-5 text-white cursor-pointer"
            onClick={() => moveMonth('Right')} // 오른쪽 버튼 클릭 시 moveMonth("Right") 호출
          />
        ),
        DayContent: ({ date }: DayContentProps) => (
          <div
            className="relative flex flex-col items-center cursor-pointer"
            onClick={() => handleDayClick(date)} // 날짜 클릭 시 호출되는 이벤트
          >
            {renderDots(date)}
            <span>{date.getDate()}</span>
          </div>
        ),
      }}
      formatters={{
        formatCaption: (date) => formatCaption(date),
      }}
      modifiers={modifiers}
      modifiersClassNames={{
        routineDays: 'text-text-main font-bold', // 루틴이 있는 날짜는 하얀색으로 표시
        today: 'text-blue font-semibold', // 오늘 날짜는 파란색으로 표시
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
