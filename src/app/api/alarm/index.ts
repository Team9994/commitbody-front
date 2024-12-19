import clientApi from '@/lib/clientAxios';
import { API } from '@/types';

const ALARM = {
  GET_ALARM: '/api/v1/notification',
};

interface Alaram {
  id: number;
  content: string;
  time: string;
  profile: string;
  nickname: string;
  articleId: number;
}

interface GetAlaramPayload {
  hasNext: boolean;
  notifications: Notification[];
}

export const getAlarm = async () => {
  const params = {
    size: 50,
  };
  try {
    const res = await clientApi.get<API<GetAlaramPayload>>(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ALARM.GET_ALARM}`,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};
