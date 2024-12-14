import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  console.log('🚀 미들웨어 요청');
  return NextResponse.next();
}
