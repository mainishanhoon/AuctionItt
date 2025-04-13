'use client';

import { HeroHeader } from '@/app/_components/home/Header';
import FAQs from '@/pages/FAQs';
import Features from '@/pages/Features';
import Hero from '@/pages/Hero';
import LogoTicker from '@/pages/LogoTicker';
import ProductShowcase from '@/pages/ProductShowcase';
import Testimonial from '@/pages/Testimonials';
import { Fragment } from 'react';

export default function VisitorPage() {
  return (
    <Fragment>
      <HeroHeader />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <FAQs />
      <Testimonial />
    </Fragment>
  );
}
