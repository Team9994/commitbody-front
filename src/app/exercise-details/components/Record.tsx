import React from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts';

const Record = () => {
  return (
    <div>
      <div className="flex gap-3 mt-4 mb-5 overflow-x-scroll scrollbar-hide px-5">
        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">1RM</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">100</strong>
            <span className="text-s text-text-sub leading-[18px]">KG</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">총 볼륨</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">1000</strong>
            <span className="text-s text-text-sub leading-[18px]">KG</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">상위 기록</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">100</strong>
            <span className="text-s text-text-sub leading-[18px]">%</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">총 횟수</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">100</strong>
            <span className="text-s text-text-sub leading-[18px]">회</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">최대 횟수</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">20</strong>
            <span className="text-s text-text-sub leading-[18px]">회</span>
          </p>
        </div>
      </div>
      <div className="mb-10 bg-backgrounds-sub rounded-6 px-[18px] mx-5">
        <div className="flex items-center px-[18px] py-3">
          <span className="text-s text-text-sub leading-[18px] mr-2">주간 볼륨</span>
          <strong className="text-text-main text-lg leading-[26px]">100</strong>
          <span className="text-s text-text-sub leading-[18px]">kg</span>
        </div>
        <ChartContainer config={chartConfig} className="max-h-[144px] w-full mb-10">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: '#C2C2C2' }}
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
      <div className="px-5 mb-9">
        <h3 className="text-lg font-bold leading-[26px] text-text-main mb-2">나의 기록</h3>
        <div className="flex gap-3">
          <div className="w-[120px] rounded-6 bg-backgrounds-sub">
            <div className="flex justify-center items-center bg-backgrounds-sub text-[#C2C2C2] text-xs border-b border-b-[#3A3E47] py-1.5">
              2024. 07. 03.
            </div>

            <div className="px-5 py-2">
              <span className="font-[#888888] text-sm mr-3">
                <strong className="font-medium">20</strong>kg
              </span>
              <span className="font-[#888888] text-sm">
                <strong className="font-medium">20</strong>kg
              </span>
            </div>
            <div className="px-5 py-2">
              <span className="font-[#888888] text-sm mr-3">
                <strong className="font-medium">20</strong>kg
              </span>
              <span className="font-[#888888] text-sm">
                <strong className="font-medium">20</strong>kg
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#198DF7',
  },
};

const chartData = [
  { day: '일', desktop: 100 },
  { day: '월', desktop: 0 },
  { day: '화', desktop: 0 },
  { day: '수', desktop: 0 },
  { day: '목', desktop: 0 },
  { day: '금', desktop: 0 },
  { day: '토', desktop: 50 },
];
