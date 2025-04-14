'use client';

import { IconGavel, IconLogin2, IconMenu3 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <section className="bg-black">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black">
          <IconGavel className="bg-primary size-9 rounded-lg p-1.5 text-white" />
          <p className="text-primary font-semibold">
            Auction<span className="text-white">Itt</span>
          </p>
        </Link>
        <div className="border-opacity-30 iniline-flex size-10 border border-white md:hidden">
          <IconMenu3 className="text-white" />
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#"
            prefetch={false}
            className="text-white/60 transition hover:text-white"
          >
            About
          </Link>
          <Link
            href="#"
            prefetch={false}
            className="text-white/60 transition hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#"
            prefetch={false}
            className="text-white/60 transition hover:text-white"
          >
            FAQs
          </Link>
          <Link
            href="#"
            prefetch={false}
            className="text-white/60 transition hover:text-white"
          >
            Testimonials
          </Link>
          <Link
            href="/auth/signIn"
            className="flex items-center justify-center gap-1 rounded-md bg-green-400 px-3 py-1.5"
          >
            <IconLogin2 strokeWidth={2.5} />
            <p>SignIn</p>
          </Link>
        </nav>
      </div>
    </section>
  );
}
