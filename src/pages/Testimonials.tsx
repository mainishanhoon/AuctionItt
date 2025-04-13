'use client';

import { AnimatedTestimonials } from '@/app/_components/homePage/TestimonialCard';
import { testimonials } from '@/constants/testimonials';

export default function Testimonial() {
  return (
    <div className="grid h-full min-h-screen w-full place-content-center overflow-hidden bg-slate-900 px-8 py-24 text-slate-50">
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
