import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

type ExtendedUser = User & {
  accessToken: string;
  refreshToken: string;
  customToken: string;
};

type ExtendedToken = JWT & {
  customToken?: string;
};

export const { handlers, auth, signIn } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentials");
        const authResponse = await axios.post(
          `http://localhost:8080/api/v1/auth/sign-in`,
          {
            account: credentials.account,
            password: credentials.password,
          }
        );
        //토큰+기본 유저 정보가 담겨져 있는 user 객체를 반환
        return authResponse.data;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn Callback()");
      //그럼 여기서 받아온 토큰으로 백엔드 넘겨서 저장해주면 될것같은데. 자체 토큰 받아오면될것같고.
      if (account?.provider === "google") {
        const extendedUser = user as ExtendedUser;
        try {
          // 백엔드로 Google 인증 정보 전송
          // const response = await axios.post('http://your-backend-url/auth/google', {
          //   id_token: account.id_token,
          //   access_token: account.access_token
          // });

          // 백엔드에서 받은 커스텀 토큰을 user 객체에 추가
          extendedUser.customToken = "custom_token";
          console.log(user);
          return true;
        } catch (error) {
          console.error("Error during backend authentication:", error);
          return false; // 인증 실패
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("Jwt Callback()");
      if (user) {
        if (account?.provider === "google") {
          const extendedUser = user as ExtendedUser;
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            idToken: account.id_token,
            customToken: extendedUser.customToken,
          };
        } else if (account?.provider === "credentials") {
          const extendedUser = user as ExtendedUser;
          return {
            ...token,
            accessToken: extendedUser.accessToken,
            refreshToken: extendedUser.refreshToken,
          };
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session Callback()");
      const extendedToken = token as ExtendedToken;

      //4.Jwt Callback으로부터 반환받은 token값을 기존 세션에 추가한다
      if (token) {
        session.accessToken = extendedToken.accessToken as string;
        session.refreshToken = extendedToken.refreshToken as string;
        session.customToken = extendedToken.customToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
