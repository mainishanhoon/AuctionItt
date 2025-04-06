import { Funnel_Sans } from 'next/font/google';
import '@/app/globals.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import ThemeProvider from '@/providers/NextTheme';
import { Toaster } from '@/app/_components/ui/sonner';
import { ReactNode } from 'react';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { Banner } from '@/app/_components/home/Banner';

const poppins = Funnel_Sans({
  weight: 'variable',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AuctionItt - Bid. Win. Repeat.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  description:
    'AuctionItt is your go-to platform for live, real-time online auctions. Bid on exclusive items, sell your products, and experience transparent, secure, and engaging auctions powered by modern technology.',
  keywords:
    'online auctions, live bidding, auction platform, bid and win, product auctions, real-time auction, buy and sell, AuctionItt, digital auctions, auction site',
  authors: [
    { name: 'Nishan Kashyap', url: 'https://mainishanhoon.vercel.app' },
  ],
  openGraph: {
    title: 'AuctionItt - Bid. Win. Repeat.',
    description:
      'Join AuctionItt for live online auctions where you can bid on unique products in real time. Transparent. Fair. Fun. Start bidding today!',
    images: 'https://ibb.co/zmNWrjs', // Replace with actual image URL (JPG/PNG preferred)
    url: 'https://auctionitt.vercel.app',
  },
  twitter: {
    title: 'AuctionItt - Bid. Win. Repeat.',
    description:
      'Experience real-time bidding with AuctionItt. List your products, join auctions, and compete to win! Powered by innovative tech and seamless UX.',
    images: 'https://ibb.co/zmNWrjs', // Replace with actual image URL
    card: 'summary_large_image',
    creator: '@mainishanhoon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.className}`} suppressHydrationWarning>
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <ThemeProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster
            richColors
            closeButton
            className={`${poppins.className} font-medium`}
          />
          <Banner />
        </ThemeProvider>
      </body>
    </html>
  );
}
