import { prisma } from '@/app/_utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ userId: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { userId } = await params;

  const data = await prisma.item.delete({
    where: {
      id: userId,
    },
  });

  if (!data) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
