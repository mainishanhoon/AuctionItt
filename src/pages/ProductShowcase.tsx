import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function ProductShowcase() {
  const dashboardImg = useRef(null);
  const { scrollYProgress } = useScroll({
    target: dashboardImg,
    offset: ['start end', 'end end'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section className="bg-gradient-to-b from-black to-emerald-500 py-18 text-white md:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Intuitive Interface
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center md:text-xl text-white/70">
          Easily navigate, bid, and manage auctions with a clean, user-friendly
          and thoughtfully designed layout.
        </p>
        <motion.div
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: '800px',
          }}
          className="mt-14 flex justify-center"
        >
          <Image
            src="/Dashboard.png"
            alt="Dashboard Image"
            width={1000}
            height={1000}
            ref={dashboardImg}
            className="rounded-[1px] md:rounded-sm"
          />
        </motion.div>
      </div>
    </section>
  );
}
