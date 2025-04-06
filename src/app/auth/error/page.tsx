import { Button } from '@/app/_components/ui/button';
import { IconAlertHexagon } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export default function ErrorPage() {
  return (
    <section className="flex h-dvh w-screen flex-col items-center justify-center p-4">
      <div className="border-muted-foreground bg-muted animate-in fade-in-50 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-red-500/10">
          <IconAlertHexagon strokeWidth={3} className="size-16 text-red-500" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">Something Went Wrong !!</h2>
        <p className="text-muted-foreground mx-auto mt-2 mb-8 max-w-sm text-center text-sm leading-tight tracking-wide">
          Please Sign in again to access our services.
        </p>
        <Button variant="default" size="sm">
          <Link href="/auth/signIn">Go Back</Link>
        </Button>
      </div>
    </section>
  );
}
