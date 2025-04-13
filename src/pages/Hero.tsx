'use client';

import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section
      id="Hero"
      className="bg-background relative overflow-clip bg-[linear-gradient(to_bottom,#000000,#0B2E1D_34%,#1E7F4D_65%,#74D99F_82%)] py-18 text-white md:pb-24 lg:pb-30"
    >
      <span className="absolute top-[calc(100%-96px)] bottom-24 left-1/2 h-[375px] w-[750px] -translate-x-1/2 overflow-clip rounded-[100%] border border-emerald-500 bg-black bg-[radial-gradient(closest-side,#000000_82%,#34D399)] sm:h-[600px] sm:w-[1536px] md:top-[calc(100%-120px)] lg:top-[calc(100%-140px)] lg:h-[650px] lg:w-[2000px] xl:h-[850px] xl:w-[2000px] 2xl:h-[750px] 2xl:w-[2800px]" />
      <div className="relative">
        <div className="flex items-center justify-center">
          <Link
            href="#"
            prefetch={false}
            className="inline-flex gap-3 rounded-lg border border-white/30 px-2 py-1"
          >
            <span className="bg-[linear-gradient(to_bottom,#6EE7B7,#34D399,#10B981,#047857)] bg-clip-text font-medium text-transparent">
              Version 2.0 is here
            </span>
            <span className="inline-flex items-center gap-1 font-light">
              <span>Read More</span>
              <IconArrowRight strokeWidth={2.5} />
            </span>
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <div className="relative inline-flex">
            <h1 className="inline-flex text-center text-7xl font-bold tracking-tight md:text-9xl">
              One Task <br /> At a Time
            </h1>
            <motion.div
              initial={{ x: -100, y: -100, opacity: 0 }}
              whileInView={{ rotate: 20, x: -80, y: 0, opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 10,
                duration: 1,
              }}
              drag
              dragSnapToOrigin
              className="absolute top-[56px] right-[498px] hidden size-72 md:inline"
            >
              <Image
                src="/paddle.webp"
                alt="cursor"
                height={500}
                width={500}
                className="max-w-none"
                draggable={false}
              />
            </motion.div>
            <motion.div
              initial={{ x: -100, y: -100, opacity: 0 }}
              whileInView={{ rotate: -20, x: -50, y: -50, opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 10,
                duration: 1,
              }}
              drag
              dragSnapToOrigin
              className="absolute top-[108px] left-[476px] hidden size-96 md:inline"
            >
              <Image
                src="/hammer.webp"
                alt="cursor"
                height={500}
                width={500}
                className="max-w-none"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-md text-center text-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quidem
          amet voluptatibus voluptatum, corporis nam ex! Laborum, incidunt. Iure
          enim id fuga est. Culpa ab error enim itaque distinctio soluta?
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
