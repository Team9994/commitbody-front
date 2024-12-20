import { useQuery } from '@tanstack/react-query';
import { getAlarm } from '..';

export const useAlarm = () => {
  return useQuery({
    queryKey: ['GET_Alarm'],
    queryFn: () => {
      return getAlarm();
    },
  });
};
