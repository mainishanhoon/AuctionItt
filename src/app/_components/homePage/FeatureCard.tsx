import { IconLeaf } from '@tabler/icons-react';
import { useMotionTemplate, motion, useMotionValue } from 'motion/react';
import { useEffect, useRef } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  const border = useRef<HTMLDivElement>(null);
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!border.current) return;
      const borderRect = border.current?.getBoundingClientRect();
      offsetX.set(e.x - borderRect.x);
      offsetY.set(e.y - borderRect.y);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div
      key={title}
      className="relative rounded-xl border border-white/30 px-5 py-10 text-center md:flex-1"
    >
      <motion.span
        ref={border}
        style={{ WebkitMaskImage: maskImage, maskImage }}
        className="absolute inset-0 rounded-xl border-2 border-emerald-400"
      />
      <div className="inline-flex size-14 items-center justify-center rounded-lg bg-white text-black">
        <IconLeaf />
      </div>
      <h3 className="mt-6 font-bold">{title}</h3>
      <p className="mt-2 text-white/70">{description}</p>
    </div>
  );
}
