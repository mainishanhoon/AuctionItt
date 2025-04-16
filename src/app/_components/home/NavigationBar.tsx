'use client';

import { motion } from 'motion/react';
import ScrambleHover from '@/app/_components/ui/scramble-hover';
import { Link as Scroll } from 'react-scroll/modules';
import { Fragment } from 'react';
import { navItems } from '@/constants/header';

export default function NavBar() {
  return (
    <Fragment>
      {navItems.map(({ name, href }) => (
        <Scroll
          key={name}
          to={href}
          spy={true}
          smooth={true}
          duration={1000}
          className="cursor-pointer opacity-60 transition-opacity duration-500 hover:opacity-90"
        >
          <motion.div
            layout
            key={name}
            animate={{ opacity: [0, 1, 1], y: [10, 10, 0] }}
            transition={{
              duration: 0.1,
              ease: 'circInOut',
              times: [0, 0.2, 1],
            }}
          >
            <ScrambleHover
              text={name}
              scrambleSpeed={50}
              maxIterations={8}
              useOriginalCharsOnly={true}
            />
          </motion.div>
        </Scroll>
      ))}
    </Fragment>
  );
}
