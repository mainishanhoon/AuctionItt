'use client';

import { IconCircleDashedX } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { TextShimmer } from '@/app/_components/ui/text-shimmer';

export function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-background dark text-foreground fixed right-5 bottom-5 z-9999 rounded-md border py-1 ps-3 pe-1.5 shadow-lg">
      <div className="flex items-center justify-between gap-1">
        <Link
          href="https://mainishanhoon.vercel.app"
          prefetch={false}
          target="_blank"
          className="block space-x-1 text-xs font-medium"
        >
          <span className="text-white/50">Made by</span>
          <TextShimmer duration={2}>@mainishanhoon</TextShimmer>
        </Link>
        <IconCircleDashedX
          className="cursor-pointer opacity-50 transition-opacity duration-300 hover:opacity-80"
          size={18}
          aria-hidden="true"
          onClick={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
}
