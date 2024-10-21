import axios from 'axios';
import NextAuth, { Session } from 'next-auth';
import { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

type ExtendedSession = Session & {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
};

export const { handlers, auth, signIn } = NextAuth({
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
    async jwt({ token, user, account }) {
      // console.log('Jwt Callback()');

      // 초기 로그인 시 토큰 설정
      if (user) {
        if (account?.provider === 'google') {
          const extendedUser = user as ExtendedSession;

          // 구글서버로 인증
          const googleResponse = await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${account.id_token}`
          );
          const springResponse = await axios.post(`${process.env.SPRING_BACKEND_URL}/api/v1/auth`, {
            loginType: 'GOOGLE',
            socialId: googleResponse.data.kid,
          });

          return {
            ...token,
            accessToken: springResponse.data.data.accessToken,
            refreshToken: springResponse.data.data.refreshToken,
            nickname: springResponse.data.data.tokenInfo?.nickname,
            accessTokenExpires: Date.now() + 60 * 60 * 1000, // 예: 1시간 후 만료
          };
        } else if (account?.provider === 'kakao') {
          const springResponse = await axios.post(`${process.env.SPRING_BACKEND_URL}/api/v1/auth`, {
            loginType: 'KAKAO',
            socialId: account.providerAccountId,
          });

          return {
            ...token,
            accessToken: springResponse.data.data.accessToken,
            refreshToken: springResponse.data.data.refreshToken,
            nickname: springResponse.data.data.nickname,
            accessTokenExpires: Date.now() + 60 * 60 * 1000, // 예: 1시간 후 만료
          };
        }
      }

      // 토큰 만료 확인 및 재발급 처리
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // 토큰이 만료된 경우, refresh token으로 새로운 access token 발급
      return await refreshAccessToken(token);
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
    const response = await axios.post(`${process.env.SPRING_BACKEND_URL}/api/v1/auth/refresh`, {
      refreshToken: token.refreshToken,
    });

    return {
      ...token,
      accessToken: response.data.data.accessToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, // 새로운 만료 시간 설정
      refreshToken: response.data.data.refreshToken || token.refreshToken, // 필요 시 새로 갱신된 refreshToken 사용
    };
  } catch (error) {
    console.error('Refresh Access Token Error:', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
