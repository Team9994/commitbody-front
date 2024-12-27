import React from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts';
import { ExerciseData } from '@/app/api/exercise-details/type';

interface RecordType {
  info: ExerciseData | undefined;
}

const Record = ({ info }: RecordType) => {
  // Preparing chart data for each day of the week
  const chartData = [
    {
      day: '일',
      desktop: info?.reportDto.weekReports.find((w) => w.dayOfWeek === 'SUNDAY')?.data || 0,
    },
    {
      day: '월',
      desktop: info?.reportDto.weekReports.find((w) => w.dayOfWeek === 'MONDAY')?.data || 0,
    },
    {
      day: '화',
      desktop: info?.reportDto.weekReports.find((w) => w.dayOfWeek === 'TUESDAY')?.data || 0,
    },
    {
      day: '수',
      desktop: info?.reportDto.weekReports.find((w) => w.dayOfWeek === 'WEDNESDAY')?.data || 0,
    },
    {
      day: '목',
      desktop: info?.reportDto.weekReports.find((w) => w.dayOfWeek === 'THURSDAY')?.data || 0,
    },
    {
      day: '금',
      desktop: info?.reportDto.weekReports.find((w) => w.dayOfWeek === 'FRIDAY')?.data || 0,
    },
    {
      day: '토',
      desktop: info?.reportDto.weekReports.find((w) => w.dayOfWeek === 'SATURDAY')?.data || 0,
    },
  ];

  return (
    <div>
      <div className="flex gap-3 mt-4 mb-5 overflow-x-scroll scrollbar-hide px-5">
        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">1RM</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">
              {info?.reportDto.maxRep || 0}
            </strong>
            <span className="text-s text-text-sub leading-[18px]">회</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">총 횟수</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">
              {info?.reportDto.totalRep || 0}
            </strong>
            <span className="text-s text-text-sub leading-[18px]">회</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">주간 횟수</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">
              {info?.reportDto.weekRep || 0}
            </strong>
            <span className="text-s text-text-sub leading-[18px]">회</span>
          </p>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="mb-10 bg-backgrounds-sub rounded-6 px-4 mx-5">
        <div className="flex items-center pt-4 pb-2">
          <span className="text-sm text-text-sub leading-[18px] px-2 mr-2">주간 횟수</span>
          <strong className="text-text-main text-lg leading-[26px]">
            {info?.reportDto.weekRep || 0}
          </strong>
          <span className="text-s text-text-sub leading-[18px]">회</span>
        </div>
        <ChartContainer config={{ desktop: { label: 'Desktop', color: '#198DF7' } }}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: '#c2c2c2' }}
              />

              <Bar dataKey="desktop" radius={2} fill="#198DF7" minPointSize={4}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.desktop === 0 ? '#555555' : '#198df7'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Records */}
      <div className="px-5 mb-9">
        <h3 className="text-lg font-bold leading-[26px] text-text-main mb-2">나의 기록</h3>
        <div className="flex gap-3">
          {info?.recordSetsDtos &&
            Object.entries(info.recordSetsDtos).map(([date, records]) => (
              <div key={date} className="w-[120px] rounded-6 bg-backgrounds-sub">
                <div className="flex justify-center items-center bg-backgrounds-sub text-[#C2C2C2] text-xs border-b border-b-[#3A3E47] py-1.5">
                  {new Date(date).toLocaleDateString()}
                </div>
                <div className="px-5 py-2">
                  {records.map((set, setIndex) => (
                    <span
                      key={setIndex}
                      className="flex justify-center font-[#888888] text-sm mr-3"
                    >
                      <strong className="font-medium">{set.reps}</strong>회
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Record;
