import { Button } from '@/components/ui/button';
import { BadgeAlert } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ErrorPage() {
  return (
    <section className="flex h-dvh w-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground bg-muted p-8 text-center animate-in fade-in-50">
        <div className="flex size-24 items-center justify-center rounded-full bg-red-500/10">
          <BadgeAlert strokeWidth={3} className="size-16 text-red-500" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">Something Went Wrong !!</h2>
        <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm font-bold leading-tight tracking-wide text-muted-foreground">
          Please refill the form
        </p>
        <p className="font-mont font-bold tracking-wider">
          For any queries you can contact:
        </p>
        <p className="font-mont mb-1 mt-2 font-bold tracking-wide">
          Saransh Tiwari: 7869770020
        </p>
        <p className="font-mont font-bold tracking-wide">
          Shreyansh Saxena: 9479966175
        </p>
        <br />

        <Button variant="default" size="lg">
          <Link href="/">Back to Form</Link>
        </Button>
      </div>
    </section>
  );
}
