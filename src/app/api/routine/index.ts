import axios from 'axios';
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
    console.log('실행됨');
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.GET_ROUTINE_List}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error('Error fetching routine list:', error);
  }
};

export const getRoutineDetail = async (id: string, session: any) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.GET_ROUTINE_DETAIL(id)}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching routine detail:', error);
  }
};

export const postRegisterRoutine = async (payload: Register_Routine_Payload, session: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.POST_REGISTER_ROUTINE}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error registering routine:', error);
  }
};

export const putUpdateRoutine = async (
  id: string,
  payload: Register_Routine_Payload,
  session: any
) => {
  try {
    const res = await axios.put(
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
    console.error('Error updating routine:', error);
  }
};

export const deleteDeleteRoutine = async (id: string, session: any) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.DELETE_DELETE_ROUTINE(id)}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error deleting routine:', error);
  }
};
