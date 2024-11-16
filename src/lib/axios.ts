import axios from 'axios';
import { auth, signIn, signOut } from '@/auth';

const api = axios.create({
  baseURL: process.env.SPRING_BACKEND_URL,
});

const createErrorMessage = (error: any) => {
  return {
    status: error.response?.status,
    message: error.response?.data?.message,
    url: error.config?.url,
    method: error.config?.method?.toUpperCase(),
  };
};

api.interceptors.request.use(async (config) => {
  const session = await auth();

  if (config.url?.includes('/auth/refresh')) {
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

    // 에러 로깅을 더 명확하게
    if (originalRequest.url?.includes('/auth/refresh')) {
      console.error('🔄 Refresh Token API Error:', createErrorMessage(error));
    } else {
      console.error('🔴 API Error:', createErrorMessage(error));
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // console.log('인터셉트 refresh요청 ');
        const session = await auth();
        const response = await axios.post(
          `${process.env.SPRING_BACKEND_URL}/api/v1/auth-refresh`,
          { refreshToken: session?.refreshToken },
          {
            headers: {
              Authorization: `Bearer ${session?.refreshToken}`,
            },
          }
        );
        console.log('인터셉트 refresh요청 : ', response);
        const newAccessToken = response.data.data.accessToken;
        // 세션 업데이트
        await signIn('update', {
          accessToken: newAccessToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1시간
        });

        // 새로운 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // refresh token도 만료된 경우 로그아웃 처리
        // if (refreshError.response?.status === 401) {
        //   await signOut({ redirect: true, callbackUrl: '/login' });
        // }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
