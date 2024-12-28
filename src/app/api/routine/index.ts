import { Register_Routine_Payload } from '@/app/routine/types';
import { api } from '@/lib/axios';
import clientApi from '@/lib/clientAxios';

const ROUTINE = {
  GET_ROUTINE_List: '/api/v1/routine',
  GET_ROUTINE_DETAIL: (id: string) => `/api/v1/routine/${id}`,
  POST_REGISTER_ROUTINE: '/api/v1/routine',
  PUT_UPDATE_ROUTINE: (id: string) => `/api/v1/routine/${id}`,
  DELETE_DELETE_ROUTINE: (id: string) => `/api/v1/routine/${id}`,
};

export const getRoutineList = async () => {
  try {
    const res = await api.get(ROUTINE.GET_ROUTINE_List);
    return res.data.data;
  } catch (error) {
    // console.error('Error fetching routine list:', error);
  }
};

export const getRoutineDetail = async (id: string) => {
  try {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.GET_ROUTINE_DETAIL(id)}`
    );
    return res.data;
  } catch (error) {
    // console.error('Error fetching routine detail:', error);
  }
};

export const postRoutine = async (payload: any) => {
  try {
    const res = await clientApi.post(ROUTINE.POST_REGISTER_ROUTINE, payload);
    console.log('Request successful:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('Error registering routine:', error);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};
export const putUpdateRoutine = async (id: string, payload: Register_Routine_Payload) => {
  try {
    const res = await api.put(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.PUT_UPDATE_ROUTINE(id)}`,
      payload
    );
    return res.data;
  } catch (error) {
    // console.error('Error updating routine:', error);
  }
};

export const deleteDeleteRoutine = async (id: string) => {
  try {
    const res = await clientApi.delete(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${ROUTINE.DELETE_DELETE_ROUTINE(id)}`
    );
    return res.data;
  } catch (error) {
    // console.error('Error deleting routine:', error);
  }
};
