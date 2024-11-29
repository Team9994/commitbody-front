import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { fcmToken } = await request.json();
  console.log(fcmToken);
  console.log(fcmToken);
  console.log(fcmToken);
  // FCM 토큰을 서버의 세션에 저장
  const response = NextResponse.json({ success: true });
  response.cookies.set('fcm_token', fcmToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return response;
}
