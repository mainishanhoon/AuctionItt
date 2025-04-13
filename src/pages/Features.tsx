import { features } from '@/constants/features';
import { IconLeaf } from '@tabler/icons-react';

export default function Features() {
  return (
    <section
      id="Features"
      className="font-display bg-black py-18 text-white md:py-24"
    >
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Everything you need
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-xl text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse iusto
          doloribus amet! Vero error qui eveniet, fuga maiores quo inventore
          ullam, deserunt
        </p>
        <div className="mt-16 flex flex-col gap-4 md:flex-row">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="relative rounded-xl border border-white/30 px-5 py-10 text-center md:flex-1"
            >
              <div
                className="absolute inset-0 rounded-xl border-2 border-purple-400 [mask-image:radial-gradient(transparent,black_20%,black_80%,transparent)]"
                style={}
              ></div>
              <div className="inline-flex size-14 items-center justify-center rounded-lg bg-white text-black">
                <IconLeaf />
              </div>
              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-2 text-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
