import { Rubik } from 'next/font/google';
import '@/app/globals.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import ThemeProvider from '@/providers/NextTheme';
import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';

const rubik = Rubik({
  weight: 'variable',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SoleMate',
  description: 'Made by @mainishanhoon',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${rubik.className} bg-background`}
        suppressHydrationWarning
      >
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <ThemeProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
          {modal}
          <Toaster
            richColors
            closeButton
            className={`${rubik.className} font-medium`}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
