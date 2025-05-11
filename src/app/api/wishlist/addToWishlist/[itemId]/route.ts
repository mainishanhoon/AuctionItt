import { NextRequest, NextResponse } from 'next/server';
import redis from '@/app/_utils/redis';
import { getUser } from '@/hooks/hooks';

interface Params {
  params: Promise<{ itemId: string }>;
}

export async function POST(req: NextRequest, { params }: Params) {
  const { itemId } = await params;
  const user = await getUser();

  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const redisKey = `wishlist:${user.id}`;

  await redis.sadd(redisKey, itemId);

  return NextResponse.json({ success: true });
}
