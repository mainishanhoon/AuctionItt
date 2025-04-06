'use client';

import { HeroHeader } from '@/app/_components/home/Header';
import Features from '@/sections/Features';
import Hero from '@/sections/Hero';
import Testimonial from '@/sections/Testimonials';
import { Fragment } from 'react';

export default function VisitorPage() {
  return (
    <Fragment>
      <HeroHeader />
      <Hero />
      <Features />
      <Testimonial />
    </Fragment>
  );
}
