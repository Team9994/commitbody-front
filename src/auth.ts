import axios from 'axios';
import api from '@/lib/axios';
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
      // console.log('Jwt Callback()');
      if (trigger === 'update' && session?.nickname) {
        token.nickname = session.nickname;
      }
      // 초기 로그인 시 토큰 설정
      if (user) {
        if (account?.provider === 'google') {
          const extendedUser = user as ExtendedSession;

          // 구글서버로 인증
          const googleResponse = await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${account.id_token}`
          );
          // 쿠키에서 FCM 토큰 읽기
          const { cookies } = await import('next/headers');
          const fcmToken = cookies().get('fcm_token')?.value;
          console.log('서버에서 읽은 FCM 토큰:', fcmToken);
          console.log('서버에서 읽은 FCM 토큰:', fcmToken);
          console.log('서버에서 읽은 FCM 토큰:', fcmToken);
          console.log(googleResponse.data.kid);
          console.log(googleResponse.data.kid);
          console.log(googleResponse.data.kid);
          console.log(googleResponse.data.kid);
          const springResponse = await axios.post(`${process.env.SPRING_BACKEND_URL}/api/v1/auth`, {
            loginType: 'GOOGLE',
            socialId: googleResponse.data.kid,
            fcmToken: fcmToken || '',
          });

          // FCM 토큰 사용 후 쿠키 삭제
          cookies().delete('fcm_token');

          console.log(googleResponse.data.kid);

          console.log('여기');
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
            fmcToken: (account as any).fcmToken || '',
          });

          return {
            ...token,
            accessToken: springResponse.data.data.accessToken,
            refreshToken: springResponse.data.data.refreshToken,
            nickname: springResponse.data.data.nickname,
          };
        }
      }

      if (trigger === 'update' && session) {
        token = { ...token, user: session };
        return token;
      }

      return token;
    },

    async session({ session, token }: { session: ExtendedSession; token: any }) {
      // Jwt Callback으로부터 반환받은 token값을 기존 세션에 추가
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

// Access Token 재발급 함수
async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(`${process.env.SPRING_BACKEND_URL}/api/v1/auth-refresh`, {
      headers: {
        Authorization: `Bearer ${token.refreshToken}`,
      },
    });

    return {
      ...token,
      accessToken: response.data.data.accessToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000,
      refreshToken: response.data.data.refreshToken || token.refreshToken,
    };
  } catch (error) {
    console.error('Refresh Access Token Error:', createErrorMessage(error));

    // refresh token이 만료된 경우 (400 에러)
    // if (error.response?.status === 400) {
    //   // 로그아웃 처리
    //   await signOut({
    //     redirect: true,
    //     callbackUrl: '/sign', // 또는 '/login' 등 원하는 경로
    //   });
    // }

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
