import { useSuspenseQuery } from '@tanstack/react-query';
import { getAlarm } from '..';

export const useAlarm = () => {
  return useSuspenseQuery({
    queryKey: ['GET_Alarm'],
    queryFn: () => {
      return getAlarm();
    },
  });
};
