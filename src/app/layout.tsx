import { Funnel_Display, Funnel_Sans } from 'next/font/google';
import '@/app/globals.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import ThemeProvider from '@/providers/NextTheme';
import { Toaster } from '@/app/_components/ui/sonner';
import { ReactNode } from 'react';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const funnelSans = Funnel_Sans({
  variable: '--font-funnel-sans',
  weight: 'variable',
  subsets: ['latin'],
});

const funnelDisplay = Funnel_Display({
  variable: '--font-funnel-display',
  weight: 'variable',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AuctionItt - Bid. Win. Repeat.',
  icons: {
    icon: '/Icon.png',
    shortcut: '/Icon.png',
    apple: '/Icon.png',
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
    images: 'https://ibb.co/ks8DyxPj',
    url: 'https://auctionitt.vercel.app',
  },
  twitter: {
    title: 'AuctionItt - Bid. Win. Repeat.',
    description:
      'Experience real-time bidding with AuctionItt. List your products, join auctions, and compete to win! Powered by innovative tech and seamless UX.',
    images: 'https://ibb.co/ks8DyxPj',
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
      <body
        className={`${funnelSans.className} ${funnelDisplay.variable} antialiased`}
      >
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <ThemeProvider defaultTheme="system">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          <Toaster
            richColors
            closeButton
            className={`${funnelSans.className} font-medium`}
          />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
