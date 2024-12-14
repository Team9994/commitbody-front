import clientApi from '@/lib/clientAxios';
import axios from 'axios';

const CONFIG = {
  POST_LOGOUT: '/api/v1/logout',
  POST_WITH_DRAW: '/api/v1/withdraw',
  GET_NOTIFICATION: '/api/v1/notification/settings',
  POST_NOTIFICATION: '/api/v1/notification/settings',
};

export const postLogout = async () => {
  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.POST_LOGOUT}`
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export const postWithDraw = async () => {
  try {
    const res = await clientApi.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.POST_WITH_DRAW}`,
      { check: true }
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export const getNotification = async () => {
  try {
    const res = await clientApi.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.GET_NOTIFICATION}`
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export const postNotification = async () => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.POST_NOTIFICATION}`,
      { check: true }
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};
