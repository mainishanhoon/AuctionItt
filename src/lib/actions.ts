'use server';

import { parseWithZod } from '@conform-to/zod';
import { OnboardingUserSchema } from './schema';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/hooks/hooks';
import { prisma } from '@/lib/prisma';
import { signOut } from '@/lib/auth';

export async function SignOut() {
  await signOut({ redirectTo: '/' });
}

export async function OnboardingUserAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: OnboardingUserSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const session = await fetchUser();

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      state: submission.value.state,
      city: submission.value.city,
      pinCode: submission.value.pinCode,
    },
  });

  redirect('/dashboard');
}
