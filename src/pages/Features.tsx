'use effect';

import FeatureCard from '@/app/_components/homePage/FeatureCard';
import { features } from '@/constants/features';

export default function Features() {
  return (
    <section id="features" className="bg-black py-18 text-white md:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Everything you need
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-xl text-white/70">
          Power-packed tools designed to elevate your bidding game with speed,
          alerts, and total control.
        </p>
        <div className="mt-16 flex flex-col gap-4 lg:flex-row">
          {features.map(({ title, description, icon }) => (
            <FeatureCard
              title={title}
              description={description}
              icon={icon}
              key={title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
