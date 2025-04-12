'use client';

import { HeroHeader } from '@/app/_components/home/Header';
import Banner from '@/pages/Banner';
import Features from '@/pages/Features';
import Hero from '@/pages/Hero';
import Testimonial from '@/pages/Testimonials';
import { Fragment } from 'react';

export default function VisitorPage() {
  return (
    <Fragment>
      <Banner />
      <HeroHeader />
      <Hero />
      <Features />
      <Testimonial />
    </Fragment>
  );
}
