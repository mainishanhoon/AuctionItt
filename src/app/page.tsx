'use client';

import { HeroHeader } from '@/components/Header';
import Features from '@/sections/Features';
import Hero from '@/sections/Hero';
import Testimonial from '@/sections/Testimonials';
import { Fragment } from 'react';

export default function Page() {
  return (
    <Fragment>
      <HeroHeader />
      <Hero />
      <Features />
      <Testimonial />
    </Fragment>
  );
}
