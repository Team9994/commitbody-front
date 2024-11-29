'use client';

import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const clientApi = axios.create({
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

// 클라이언트 사이드에서만 실행되는 인터셉터
clientApi.interceptors.request.use(async (config) => {
  try {
    const session = await getSession();

    // 리프레시 토큰 요청인 경우
    if (config.url?.includes('/auth-refresh')) {
      config.headers.Authorization = `Bearer ${session?.refreshToken}`;
      return config;
    }

    // 일반 요청인 경우
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  } catch (error) {
    console.error('Request interceptor error:', error);
    return config;
  }
});

clientApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.config) {
      console.error('API Error without config:', error);
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await getSession();
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

        // 세션 업데이트
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken: newAccessToken }),
        });

        // 새 토큰으로 헤더 업데이트
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        clientApi.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 요청 재시도
        return clientApi.request(originalRequest);
      } catch (refreshError: any) {
        console.error('Token refresh failed:', createErrorMessage(refreshError));
        if (refreshError.response?.status === 401) {
          await signOut({ redirect: true, callbackUrl: '/sign' });
        }
        return Promise.reject(refreshError);
      }
    }

    // 401 이외의 에러인 경우
    console.error('API Error:', createErrorMessage(error));
    return Promise.reject(error);
  }
);

export default clientApi;
