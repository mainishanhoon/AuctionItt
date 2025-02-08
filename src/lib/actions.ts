'use server';

import { parseWithZod } from '@conform-to/zod';
import { ItemsSchema, OnboardingUserSchema } from './schema';
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

  redirect('/home');
}

export async function ItemCreationAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: ItemsSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const session = await fetchUser();

  const flattenURLs = submission.value.image.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim()),
  );

  await prisma.items.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      image: flattenURLs,
      userId: session.user?.id!,
    },
  });

  redirect('/home/dashboard');
}
