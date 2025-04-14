'use client';

import CallToAction from '@/pages/CallToAction';
import FAQs from '@/pages/FAQs';
import Features from '@/pages/Features';
import Footer from '@/pages/Footer';
import Header from '@/pages/Header';
import Hero from '@/pages/Hero';
import LogoTicker from '@/pages/LogoTicker';
import ProductShowcase from '@/pages/ProductShowcase';
import Testimonial from '@/pages/Testimonials';
import { Fragment } from 'react';

export default function VisitorPage() {
  return (
    <Fragment>
      <Header />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <FAQs />
      <Testimonial />
      <CallToAction />
      <Footer />
    </Fragment>
  );
}
