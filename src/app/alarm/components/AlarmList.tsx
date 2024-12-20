import { useAlarm } from '@/app/api/alarm/query';
import React from 'react';

const AlarmList = () => {
  const { data } = useAlarm();
  return (
    <div>
      {data?.data?.notifications.length === 0 && (
        <p className="text-center mt-20 text-text-light">알림이 없습니다.</p>
      )}
    </div>
  );
};

export default AlarmList;
