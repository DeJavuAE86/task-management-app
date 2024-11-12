import { NextResponse } from 'next/server';

// 如果暂时不使用 Task 类型，可以先注释掉
// import type { Task } from '@/types/task';

export async function GET() {
  // TODO: Implement task fetching
  return NextResponse.json({ tasks: [] });
}

export async function POST(request: Request) {
  // TODO: Implement task creation
  const body = await request.json();
  return NextResponse.json({ task: body });
}
