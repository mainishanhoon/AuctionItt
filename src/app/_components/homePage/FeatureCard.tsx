import { useMotionTemplate, motion, useMotionValue } from 'motion/react';
import { ElementType, useEffect, useRef } from 'react';
import { BorderTrail } from './BorderTrail';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ElementType;
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  const border = useRef<HTMLDivElement>(null);
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;
  const Icon = icon;

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
  }, [offsetX, offsetY]);

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
      <div className="relative inline-flex size-14 items-center justify-center rounded-lg bg-white text-black">
        <BorderTrail
          style={{
            boxShadow:
              '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
          }}
          size={100}
        />
        <Icon size={30} />
      </div>
      <h3 className="mt-6 font-bold">{title}</h3>
      <p className="mt-2 text-white/70 text-sm md:text-base">{description}</p>
    </div>
  );
}
