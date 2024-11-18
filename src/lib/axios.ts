import axios from 'axios';
import { auth, signIn, signOut, updateSession } from '@/auth';

const api = axios.create({
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
  if (config.url?.includes('/auth-refresh')) {
    console.log('리프레시토큰보냄');
    config.headers.Authorization = `Bearer ${session?.refreshToken}`;
  }

  if (session?.accessToken) {
    console.log('일반토큰보냄');
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes('/auth/refresh')) {
      console.error('🔄 Refresh Token API Error:', createErrorMessage(error));
    } else {
      console.error('🔴 API Error:', createErrorMessage(error));
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('여기 실행됨?1');

      try {
        const session = await auth();
        console.log('억세스토큰 발급을 위한 리프레시토큰 보냄');
        const response = await axios.post(
          `${process.env.SPRING_BACKEND_URL}/api/v1/auth-refresh`,
          {
            refreshToken: session?.refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.refreshToken}`,
            },
          }
        );
        console.log('인터셉트 refresh요청 : ', createResponseMessage(response));
        console.log(response.data.data.accessToken);
        // 응답 데이터 구조 확인을 위한 로그
        console.log('Refresh Token Response:', response.data);

        // 응답 구조에 맞게 수정
        const newAccessToken = response.data.data.accessToken; // 또는 response.data.data.accessToken

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

        // 현재 요청의 헤더 업데이트
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        console.log('새로운 토큰으로 요청 재시도:', {
          token: newAccessToken, // 토큰 값 확인
          url: originalRequest.url,
          headers: originalRequest.headers,
        });

        return api.request(originalRequest);
      } catch (refreshError: any) {
        // refresh token도 만료된 경우 로그아웃 처리
        console.log('리프레시토큰 발급 실패');
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
