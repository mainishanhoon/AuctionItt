'use client';

import { IconCircleDashedX } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { TextShimmer } from '../ui/text-shimmer';

export function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-background text-foreground fixed right-5 bottom-5 z-9999 rounded-md border py-1 ps-3 pe-1.5 shadow-lg">
      <div className="flex items-center justify-between gap-0.5">
        <Link
          href="https://mainishanhoon.vercel.app"
          prefetch={false}
          target="_blank"
          className="block space-x-1 text-xs font-medium"
        >
          <span className="text-muted-foreground">Made by</span>
          <TextShimmer duration={2}>@mainishanhoon</TextShimmer>
        </Link>
        <button
          className="group focus-visible:border-ring focus-visible:ring-ring/50 flex size-7 cursor-pointer items-center justify-center rounded transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none"
          onClick={() => setIsVisible(false)}
        >
          <IconCircleDashedX
            className="opacity-50 transition-opacity group-hover:opacity-80"
            size={18}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
