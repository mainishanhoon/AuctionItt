import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export async function fetchUser() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return session;
}
