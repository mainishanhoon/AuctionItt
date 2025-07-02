import { prisma } from '@/app/_utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ itemId: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { itemId } = await params;

  const data = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });

  if (!data) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
