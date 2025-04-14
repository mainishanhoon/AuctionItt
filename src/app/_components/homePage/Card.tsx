import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className, children, ...other }: CardProps) {
  return (
    <div
      className={twMerge(
        "relative z-0 overflow-hidden rounded-xl bg-gray-800 after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-xl after:outline-2 after:-outline-offset-2 after:outline-white/20 after:content-[''] md:rounded-3xl md:after:rounded-3xl",
        className,
      )}
      {...other}
    >
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{ backgroundImage: `url(/noise.webp)` }}
      />
      {children}
    </div>
  );
}
