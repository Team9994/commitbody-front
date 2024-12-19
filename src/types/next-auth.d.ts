import NextAuth from 'next-auth';
// session 속성 재정의
declare module 'next-auth' {
  interface Session {
    user: {
      name: number;
      image: string;
      sub: string;
      type: string;
      token: string;
      id: string;
      iat: number;
      exp: number;
      jti: string;
    };
    accessToken: string;
    refreshToken: string;
    customToken: string;
    nickname: string;
  }
}
