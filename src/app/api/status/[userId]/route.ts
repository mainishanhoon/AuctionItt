import { prisma } from '@/app/_utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ userId: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { userId } = await params;

  const item = await prisma.item.findUnique({
    where: {
      id: userId,
    },
  });

  await prisma.item.update({
    where: {
      id: userId,
    },
    data: {
      status: item?.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT',
    },
  });

  if (!item) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
