/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-asserted-optional-chain */

'use server';

import { parseWithZod } from '@conform-to/zod';
import { ItemsSchema, OnboardingUserSchema } from './_utils/schema';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/hooks/hooks';
import { prisma } from '@/app/_utils/prisma';
import { signOut } from '@/app/_utils/auth';
import { html, text } from '@/app/_components/emailTemplates/MagicLink';

export async function SignOut() {
  await signOut({ redirectTo: '/' });
}

export async function sendVerificationRequest(params: any) {
  const { identifier: to, provider, url, theme } = params;
  const { host } = new URL(url);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url, host }),
      text: text({ url, host }),
    }),
  });

  if (!response.ok)
    throw new Error('Resend error: ' + JSON.stringify(await response.json()));
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

export async function DeleteInvoiceAction(formData: FormData) {
  const session = await fetchUser();

  await prisma.items.delete({
    where: {
      userId: session.user?.id,
      id: formData.get('id') as string,
    },
  });

  return redirect('/home/dashboard');
}
