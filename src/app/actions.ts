/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-asserted-optional-chain */

'use server';

import { parseWithZod } from '@conform-to/zod';
import { BidSchema, ItemsSchema, UserSchema } from './_utils/schema';
import { redirect } from 'next/navigation';
import { fetchUser, getUser } from '@/hooks/hooks';
import { prisma } from '@/app/_utils/prisma';
import { signOut } from '@/app/_utils/auth';
import { html, text } from '@/app/_components/emailTemplates/MagicLink';
import { revalidatePath } from 'next/cache';
import { Redis } from '@/app/_utils/redis';
import { Wishlist } from '@/types/wishlist';

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

export async function PlaceBidAction(formData: FormData) {
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
      startingBid: submission.value.startingBid,
      image: flattenURLs,
      bidInterval: submission.value.bidInterval,
      currentBid: submission.value.startingBid,
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
      startingBid: submission.value.startingBid,
      image: flattenURLs,
      bidInterval: submission.value.bidInterval,
      currentBid: submission.value.startingBid,
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

export async function addItemToWishlist(itemId: string) {
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  const wishlist: Wishlist | null = await Redis.get(`wishlist-${user.id}`);

  const selectedProduct = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      id: true,
      name: true,
      currentBid: true,
      startingBid: true,
      bidInterval: true,
      endDate: true,
      image: true,
      bids: {
        select: {
          user: {
            select: { id: true, image: true, firstName: true, lastName: true },
          },
          amount: true,
          timestamp: true,
        },
        orderBy: { timestamp: 'desc' },
        take: 1,
      },
    },
  });

  if (!selectedProduct) {
    throw new Error('No product found with this id');
  }

  let myWishlist = {} as Wishlist;

  if (!wishlist || !wishlist.items) {
    myWishlist = {
      userId: user.id,
      items: [
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          currentBid: selectedProduct.currentBid,
          startingBid: selectedProduct.startingBid,
          bidInterval: selectedProduct.bidInterval,
          endDate: selectedProduct.endDate,
          image: selectedProduct.image[0],
          topBidder: selectedProduct.name,
        },
      ],
    };
  } else {
    let itemFound = false;

    myWishlist.items = wishlist.items.map((item) => {
      if (item.id === itemId) {
        itemFound = true;
      }

      return item;
    });

    if (!itemFound) {
      myWishlist.items.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        currentBid: selectedProduct.currentBid,
        startingBid: selectedProduct.startingBid,
        bidInterval: selectedProduct.bidInterval,
        endDate: selectedProduct.endDate,
        image: selectedProduct.image[0],
        topBidder: `${selectedProduct.bids[0]?.user.firstName} ${
          selectedProduct.bids[0]?.user.lastName
        }`,
      });
    }
  }

  await Redis.set(`wishlist-${user.id}`, myWishlist);

  revalidatePath(`/home/item/${itemId}`);
}

export async function removeItemFromWishlist(userId: string, itemId: string) {
  const rawWishlist = await Redis.get(`wishlist-${userId}`);

  if (!rawWishlist) {
    return;
  }

  const wishlist =
    typeof rawWishlist === 'string' ? JSON.parse(rawWishlist) : rawWishlist;

  const updatedItems = wishlist.items.filter((item: any) => item.id !== itemId);

  const updatedWishlist = {
    ...wishlist,
    items: updatedItems,
  };

  await Redis.set(`wishlist-${userId}`, JSON.stringify(updatedWishlist));

  revalidatePath('/home');
}
