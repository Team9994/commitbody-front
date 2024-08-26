import axios from 'axios';
import NextAuth from 'next-auth';
import { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

type ExtendedUser = User & {
  accessToken: string;
  refreshToken: string;
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
      console.log('Jwt Callback()');
      if (user) {
        if (account?.provider === 'google') {
          const extendedUser = user as ExtendedUser;

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
          };
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Jwt Callback으로부터 반환받은 token값을 기존 세션에 추가
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
