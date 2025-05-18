import { footerLinks } from '@/constants/footer';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white/60">
      <div className="container border-t border-white/20 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="text-center">
            &copy; {new Date().getFullYear()} AuctionItt, Inc. All rights
            Reserved.
          </div>
          <nav className="flex justify-center items-center gap-5">
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
