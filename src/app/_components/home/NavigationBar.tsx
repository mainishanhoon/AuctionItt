'use client';

import { motion } from 'motion/react';
import ScrambleHover from '@/app/_components/ui/scramble-hover';
import { Link as Scroll } from 'react-scroll/modules';
import { heroNavigationLink } from '@/constants/navLinks';
import { Fragment } from 'react';

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
