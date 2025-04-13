'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

export default function Noise({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ transform: 'translateX(-10%) translateY(-10%)' }}
        animate={{
          transform: 'translateX(10%) translateY(10%)',
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          ease: 'linear',
          repeatType: 'mirror',
        }}
        style={{
          backgroundImage: 'url("/noise.webp")',
        }}
        className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
      />
      {children}
    </section>
  );
}
