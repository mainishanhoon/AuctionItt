/* eslint-disable @typescript-eslint/no-unused-vars */

import { getUser } from '@/hooks/hooks';
import { prisma } from '@/app/_utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  const data = await getUser();

  try {
    const user = await prisma.item.findMany({
      where: { id: data?.id },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error Fetching User:', error);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
