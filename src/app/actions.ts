/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-asserted-optional-chain */

'use server';

import { parseWithZod } from '@conform-to/zod';
import { BidSchema, ItemsSchema, UserSchema } from './_utils/schema';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/hooks/hooks';
import { prisma } from '@/app/_utils/prisma';
import { signOut } from '@/app/_utils/auth';
import { html, text } from '@/app/_components/emailTemplates/MagicLink';
import { revalidatePath } from 'next/cache';

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

export async function PlaceBidAction(prevState: unknown, formData: FormData) {
  const session = await fetchUser();

  const submission = parseWithZod(formData, {
    schema: BidSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.$transaction([
    prisma.bid.create({
      data: {
        amount: submission.value.currentBid,
        itemId: submission.value.itemId,
        userId: String(session.user?.id),
        timestamp: new Date(),
      },
    }),
    prisma.item.update({
      where: { id: submission.value.itemId },
      data: { currentBid: submission.value.currentBid },
    }),
  ]);

  revalidatePath(`/home/item/${submission.value.itemId}`);
}

export async function OnboardingUserAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
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
      name: `${submission.value.firstName} ${submission.value.lastName}`,
      phoneNumber: submission.value.phoneNumber,
      pinCode: submission.value.pinCode,
      onboarded: true,
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

  await prisma.item.create({
    data: {
      userId: session.user?.id!,
      name: submission.value.name,
      description: submission.value.description,
      startingPrice: submission.value.startingPrice,
      image: flattenURLs,
      bidInterval: submission.value.bidInterval,
      currentBid: submission.value.startingPrice,
      endDate: submission.value.endDate,
      status: submission.value.status,
    },
  });

  redirect('/home/dashboard');
}

export async function ItemUpdationAction(
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

  await prisma.item.update({
    where: {
      userId: session.user?.id,
      id: formData.get('id') as string,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      startingPrice: submission.value.startingPrice,
      image: flattenURLs,
      bidInterval: submission.value.bidInterval,
      currentBid: submission.value.startingPrice,
      endDate: submission.value.endDate,
      status: submission.value.status,
    },
  });

  redirect('/home/dashboard');
}

export async function ProfileUpdationAction(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
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
      name: `${submission.value.firstName} ${submission.value.lastName}`,
      phoneNumber: submission.value.phoneNumber,
      pinCode: submission.value.pinCode,
      image: submission.value.image,
      email: submission.value.email,
    },
  });

  redirect('/home/dashboard');
}
