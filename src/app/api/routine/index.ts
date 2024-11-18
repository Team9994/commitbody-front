import api from '@/lib/axios';
import { Register_Routine_Payload, Exercise_Attribute } from '@/app/routine/types';

const ROUTINE = {
  GET_ROUTINE_List: '/api/v1/routine',
  GET_ROUTINE_DETAIL: (id: string) => `/api/v1/routine/${id}`,
  POST_REGISTER_ROUTINE: '/api/v1/routine',
  PUT_UPDATE_ROUTINE: (id: string) => `/api/v1/routine/${id}`,
  DELETE_DELETE_ROUTINE: (id: string) => `/api/v1/routine/${id}`,
};

export const getRoutineList = async (session: any) => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.GET_ROUTINE_List}`
    );
    return res.data.data;
  } catch (error) {
    // console.error('Error fetching routine list:', error);
  }
};

export const getRoutineDetail = async (id: string, session: any) => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.GET_ROUTINE_DETAIL(id)}`
    );
    return res.data;
  } catch (error) {
    // console.error('Error fetching routine detail:', error);
  }
};

export const postRoutine = async (payload: any, session: any) => {
  try {
    console.log('Attempting to make request...'); // 요청 시도 로그
    const res = await api.post(
      ROUTINE.POST_REGISTER_ROUTINE, // 경로만 지정
      payload
    );
    console.log('Request successful'); // 성공 로그
    return res.data;
  } catch (error) {
    console.error('Error registering routine:', error);
    throw error;
  }
};

export const putUpdateRoutine = async (
  id: string,
  payload: Register_Routine_Payload,
  session: any
) => {
  try {
    const res = await api.put(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.PUT_UPDATE_ROUTINE(id)}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    // console.error('Error updating routine:', error);
  }
};

export const deleteDeleteRoutine = async (id: string, session: any) => {
  try {
    const res = await api.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.DELETE_DELETE_ROUTINE(id)}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    // console.error('Error deleting routine:', error);
  }
};
