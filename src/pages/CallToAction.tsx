import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section
      ref={containerRef}
      className="overflow-x-clip bg-black py-18 text-white md:py-24"
    >
      <div className="relative container max-w-xl">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Try it Yourself!
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-white/70 md:text-xl">
          Jump in, explore live auctions, and experience the thrill of bidding
          firsthand—no strings attached.
        </p>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ translateY }}
        >
          <Image
            src="/biddingList.webp"
            alt="cursor"
            height={500}
            width={500}
            draggable={false}
            className="absolute -top-72 left-190 hidden size-72 lg:inline xl:left-225 xl:size-96"
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ translateY }}
        >
          <Image
            src="/lotNumber.webp"
            alt="cursor"
            height={500}
            width={500}
            draggable={false}
            className="absolute -top-72 right-190 hidden size-72 lg:inline xl:right-230 xl:size-96"
          />
        </motion.div>
        <form className="mx-auto mt-10 flex max-w-sm flex-col items-center justify-center gap-2.5 md:max-w-md md:flex-row">
          <input
            type="email"
            placeholder="loremipsum@email.com"
            className="h-12 w-full rounded-lg bg-white/20 px-5 font-medium placeholder:text-white/30"
          />
          <button className="h-12 cursor-pointer rounded-lg bg-white px-5 font-medium text-black uppercase">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
