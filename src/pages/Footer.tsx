import { footerLinks } from '@/constants/footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-black py-5 text-white/60">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="text-center">
            &copy; {new Date().getFullYear()} AuctionItt, Inc. All rights
            Reserved.
          </div>
          <nav className="flex flex-col items-center gap-5 md:flex-row">
            {footerLinks.map((link) => (
              <Link
                href={link.href}
                key={link.title}
                target="_blank"
                className="inline-flex cursor-pointer items-center gap-1.5"
              >
                <link.icon />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
