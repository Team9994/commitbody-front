import axios from 'axios';

const CONFIG = {
  POST_LOGOUT: '/api/v1/logout',
  POST_WITH_DRAW: '/api/v1/withdraw',
  GET_NOTIFICATION: '/api/v1/notification/settings',
  POST_NOTIFICATION: '/api/v1/notification/settings',
};

export const postLogout = async ({ session }: { session: any }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.POST_LOGOUT}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export const postWithDraw = async ({ session }: { session: any }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.POST_WITH_DRAW}`,
      { check: true },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export const getNotification = async ({ session }: { session: any }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.GET_NOTIFICATION}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};

export const postNotification = async ({ session }: { session: any }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}${CONFIG.POST_NOTIFICATION}`,
      { check: true },
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    throw error;
  }
};
