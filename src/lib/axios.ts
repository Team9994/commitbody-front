import axios from 'axios';
import { auth, signOut } from '@/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createErrorMessage = (error: any) => {
  return {
    status: error.response?.status,
    message: error.response?.data?.message,
    url: error.config?.url,
    method: error.config?.method?.toUpperCase(),
  };
};

const createResponseMessage = (response: any) => {
  return {
    status: response.status,
    message: response.data?.message,
    url: response.config?.url,
    method: response.config?.method?.toUpperCase(),
  };
};

api.interceptors.request.use(async (config) => {
  const session = await auth();
  console.log(config);
  if (config.url?.includes('/auth-refresh')) {
    config.headers.Authorization = `Bearer ${session?.refreshToken}`;
  }

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // error.config이 정의되지 않은 경우를 처리
    if (!error.config) {
      console.error('API Error without config:', error);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (originalRequest.url?.includes('/auth-refresh')) {
      console.error('🔄 Refresh Token API Error:', createErrorMessage(error));
    } else {
      console.error('🔴 API Error:', createErrorMessage(error));
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await auth();
        console.log('Sending refresh token...');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SPRING_BACKEND_URL}/api/v1/auth-refresh`,
          {
            refreshToken: session?.refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.refreshToken}`,
            },
          }
        );

        const newAccessToken = response.data.data.accessToken;

        if (!newAccessToken) {
          throw new Error('New access token is undefined');
        }

        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken: newAccessToken }),
        });

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        console.log('Retrying request with new token:', {
          token: newAccessToken,
          url: originalRequest.url,
          headers: originalRequest.headers,
        });

        return api.request(originalRequest);
      } catch (refreshError: any) {
        console.log('Failed to refresh token');
        console.log(refreshError);
        console.log(createErrorMessage(refreshError));
        if (refreshError.response?.status === 401) {
          await signOut({ redirectTo: '/sign' });
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
