import React from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts';
import { GetDetailsInfoType } from '@/app/api/exercise-details/type';

interface RecordType {
  info: GetDetailsInfoType | undefined;
}

const Record = ({ info }: RecordType) => {
  const chartData = [
    { day: '일', desktop: info?.day?.SUNDAY || 0 },
    { day: '월', desktop: info?.day?.MONDAY || 0 },
    { day: '화', desktop: info?.day?.TUESDAY || 0 },
    { day: '수', desktop: info?.day?.WEDNESDAY || 0 },
    { day: '목', desktop: info?.day?.THURSDAY || 0 },
    { day: '금', desktop: info?.day?.FRIDAY || 0 },
    { day: '토', desktop: info?.day?.SATURDAY || 0 },
  ];

  return (
    <div>
      {/* Record Summary */}
      <div className="flex gap-3 mt-4 mb-5 overflow-x-scroll scrollbar-hide px-5">
        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">1RM</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">{info?.maxValue || 0}</strong>
            <span className="text-s text-text-sub leading-[18px]">KG</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">총 볼륨</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">
              {info?.totalValue || 0}
            </strong>
            <span className="text-s text-text-sub leading-[18px]">KG</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">상위 기록</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">
              {info?.calculateRankPercentage || 0}
            </strong>
            <span className="text-s text-text-sub leading-[18px]">%</span>
          </p>
        </div>

        <div className="flex flex-col justify-center text-center bg-[#324151] rounded-6 min-w-25 h-16">
          <p className="text-xs text-text-sub leading-[18px] mb-1">주간 볼륨</p>
          <p>
            <strong className="text-text-main text-lg leading-[26px]">
              {info?.weekValue || 0}
            </strong>
            <span className="text-s text-text-sub leading-[18px]">KG</span>
          </p>
        </div>
      </div>

      {/* Weekly Volume Chart */}
      <div className="mb-10 bg-backgrounds-sub rounded-6 px-4 mx-5">
        <div className="flex items-center pt-4 pb-2">
          <span className="text-sm text-text-sub leading-[18px] px-2 mr-2">주간 볼륨</span>
          <strong className="text-text-main text-lg leading-[26px]">{info?.weekValue || 0}</strong>
          <span className="text-s text-text-sub leading-[18px]">kg</span>
        </div>
        <ChartContainer config={{ desktop: { label: 'Desktop', color: '#198DF7' } }}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ style: { fill: '#c2c2c2' } }}
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

      {/* Record Details */}
      <div className="px-5 mb-9">
        <h3 className="text-lg font-bold leading-[26px] text-text-main mb-2">나의 기록</h3>
        <div className="flex gap-3">
          {info?.records.map((record, index) => (
            <div key={record.recordId} className="w-[120px] rounded-6 bg-backgrounds-sub">
              <div className="flex justify-center items-center bg-backgrounds-sub text-[#C2C2C2] text-xs border-b border-b-[#3A3E47] py-1.5">
                {new Date(record.date).toLocaleDateString()}
              </div>
              <div className="px-5 py-2">
                {record.sets.map((set: any, setIndex: number) => (
                  <span key={setIndex} className="flex justify-center font-[#888888] text-sm mr-3">
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
