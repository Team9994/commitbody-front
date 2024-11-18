import { handlers, updateSession } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accessToken } = await request.json();

    // 세션 업데이트
    await updateSession({ accessToken });

    return NextResponse.json({
      success: true,
      message: '세션이 업데이트되었습니다.',
    });
  } catch (error) {
    console.error('세션 업데이트 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '세션 업데이트에 실패했습니다.',
      },
      {
        status: 500,
      }
    );
  }
}

export const { GET } = handlers;
