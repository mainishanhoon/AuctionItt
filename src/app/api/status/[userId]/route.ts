import { prisma } from '@/app/_utils/prisma';
import { NextResponse } from 'next/server';

interface Params {
  params: Promise<{ userId: string }>;
}

export async function POST(req: Request, { params }: Params) {
  const { userId } = await params;

  const data = await prisma.item.update({
    where: {
      id: userId,
    },
    data: {
      status: 'PUBLISHED',
    },
  });

  if (!data) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
