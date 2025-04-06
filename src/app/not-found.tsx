'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/app/_components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute top-1/2 left-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="from-foreground bg-gradient-to-b to-transparent bg-clip-text text-[10rem] leading-none font-extrabold text-transparent">
        404
      </span>
      <h2 className="my-2 text-4xl font-bold">Something&apos;s missing</h2>
      <p className="font-medium">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-8 flex justify-center gap-5">
        <Button onClick={() => router.back()} variant="default">
          <p>Go back</p>
        </Button>
        <Button
          onClick={() => router.push('/home/dashboard')}
          variant="secondary"
        >
          <p>Back to Home</p>
        </Button>
      </div>
    </div>
  );
}
