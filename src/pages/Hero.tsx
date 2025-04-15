'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-background relative overflow-clip bg-[linear-gradient(to_bottom,#000000,#0B2E1D_34%,#1E7F4D_65%,#74D99F_82%)] py-18 text-white md:pb-24 lg:pb-30"
    >
      <span className="absolute top-[calc(100%-96px)] bottom-24 left-1/2 h-[375px] w-[750px] -translate-x-1/2 overflow-clip rounded-[100%] border border-emerald-500 bg-black bg-[radial-gradient(closest-side,#000000_82%,#34D399)] sm:h-[600px] sm:w-[1536px] md:top-[calc(100%-120px)] lg:top-[calc(100%-140px)] lg:h-[650px] lg:w-[2000px] xl:h-[850px] xl:w-[2000px] 2xl:h-[750px] 2xl:w-[2800px]" />
      <div className="relative">
        <div className="flex items-center justify-center">
          <Link
            href="https://github.com/mainishanhoon/AuctionItt"
            target="_blank"
            prefetch={false}
            className="inline-flex items-center gap-1 rounded-lg border border-white/30 px-2 py-1 font-medium md:border-2"
          >
            <Image
              src="/github.webp"
              alt="github"
              width={25}
              height={25}
              className="size-5 invert"
            />
            <span className="bg-[linear-gradient(to_top,#6EE7B7,#34D399,#10B981,#047857)] bg-clip-text text-transparent">
              Visit GitHub Directory
            </span>
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <div className="relative inline-flex">
            <h1 className="z-10 inline-flex text-center text-6xl md:text-7xl font-bold tracking-tight lg:text-9xl">
              Where Bids Fly <br />& Deals Land
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ rotate: 20, opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 10,
                duration: 2,
                ease: 'easeInOut',
              }}
              drag
              dragSnapToOrigin
              className="absolute top-25 right-170 hidden lg:inline xl:right-190"
            >
              <Image
                src="/paddle.webp"
                alt="cursor"
                height={500}
                width={500}
                className="size-70 max-w-none xl:size-85"
                draggable={false}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ rotate: -20, opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 10,
                duration: 2,
                ease: 'easeInOut',
              }}
              drag
              dragSnapToOrigin
              className="absolute top-25 left-170 hidden lg:inline xl:left-175"
            >
              <Image
                src="/hammer.webp"
                alt="cursor"
                height={500}
                width={500}
                className="size-70 max-w-none xl:size-96"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-md text-center md:text-xl">
          Indulge in curated auctions, premium listings, and effortless bidding,
          designed for the discerning deal seeker.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/auth/signIn">
            <button className="cursor-pointer rounded-lg bg-white px-5 py-2 font-medium text-black">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
