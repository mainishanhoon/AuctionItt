'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { navigationLink } from '@/constants/navLinks';
import { motion } from 'motion/react';
import ScrambleHover from '@/components/fancy/scramble-hover';
import { Link as Scroll } from 'react-scroll/modules';
import { heroNavigationLink } from '@/constants/navLinks';
import { Fragment } from 'react';

export function UserNavBar() {
  const pathname = usePathname();
  return (
    <Fragment>
      {navigationLink.map((label, index) => (
        <Link
          href={label.href}
          key={index}
          className={cn(
            pathname == label.href
              ? 'text-primary underline decoration-dashed decoration-2 underline-offset-4'
              : 'text-muted-foreground',
            'mx-1 flex items-center gap-2 px-3 py-2 font-semibold tracking-wide transition-all hover:text-primary/70',
          )}
        >
          <label.icon size={25} strokeWidth={2.5} />
          {label.label}
        </Link>
      ))}
    </Fragment>
  );
}

export function HeroNavBar() {
  return (
    <Fragment>
      {heroNavigationLink.map((item, index) => (
        <Scroll
          key={index}
          to={item.href}
          spy={true}
          smooth={true}
          duration={1000}
          className="cursor-pointer font-medium"
        >
          <motion.div
            layout
            key={index}
            animate={{ opacity: [0, 1, 1], y: [10, 10, 0] }}
            transition={{
              duration: 0.1,
              ease: 'circInOut',
              delay: index * 0.05 + 0.5,
              times: [0, 0.2, 1],
            }}
          >
            <ScrambleHover
              text={item.name}
              scrambleSpeed={50}
              maxIterations={8}
              useOriginalCharsOnly={true}
              className="cursor-pointer"
            />
          </motion.div>
        </Scroll>
      ))}
    </Fragment>
  );
}
