import axios from 'axios';
import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

type ExtendedSession = Session & {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
};

const createErrorMessage = (error: any) => {
  return {
    status: error.response?.status,
    message: error.response?.data?.message,
    url: error.config?.url,
    method: error.config?.method?.toUpperCase(),
  };
};

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: updateSession,
} = NextAuth({
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // 초기 로그인 시 토큰 설정
      if (user) {
        if (account?.provider === 'google') {
          const extendedUser = user as ExtendedSession;

          // 구글 서버로 인증
          const googleResponse = await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${account.id_token}`
          );
          const { cookies } = await import('next/headers');
          const fcmToken = cookies().get('fcm_token')?.value;

          const springResponse = await axios.post(`${process.env.SPRING_BACKEND_URL}/api/v1/auth`, {
            loginType: 'GOOGLE',
            socialId: googleResponse.data.kid,
            fcmToken: fcmToken || '',
          });

          // FCM 토큰 사용 후 삭제
          cookies().delete('fcm_token');

          return {
            ...token,
            accessToken: springResponse.data.data.accessToken,
            refreshToken: springResponse.data.data.refreshToken,
            nickname: springResponse.data.data.tokenInfoDto?.nickname,
          };
        } else if (account?.provider === 'kakao') {
          const springResponse = await axios.post(`${process.env.SPRING_BACKEND_URL}/api/v1/auth`, {
            loginType: 'KAKAO',
            socialId: account.providerAccountId,
            fcmToken: (account as any).fcmToken || '',
          });
          return {
            ...token,
            accessToken: springResponse.data.data.accessToken,
            refreshToken: springResponse.data.data.refreshToken,
            nickname: springResponse.data.data.nickname,
            authMode: springResponse.data.data.authMode,
          };
        }
      }

      const currentTime = Date.now();
      if (token.accessTokenExpires && +currentTime >= Number(token.accessTokenExpires)) {
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }: { session: ExtendedSession; token: any }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.nickname = token.nickname as string;
        session.accessTokenExpires = token.accessTokenExpires as number;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(
      `${process.env.SPRING_BACKEND_URL}/api/v1/auth-refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );
    console.log('갱신성공');
    return {
      ...token,
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken || token.refreshToken,
    };
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
