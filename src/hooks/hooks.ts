import { notFound, redirect } from 'next/navigation';
import { auth } from '@/app/_utils/auth';
import { prisma } from '@/app/_utils/prisma';

export async function fetchUser() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signIn');
  }

  return session;
}

export async function getUser() {
  const session = await auth();

  const data = await prisma.user.findUnique({
    where: {
      id: session?.user?.id as string,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}
