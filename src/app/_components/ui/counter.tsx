'use client';

import { MotionValue, motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils'; // Make sure this path matches your setup

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function Number({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{
        y,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      className="flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

interface DigitProps {
  place: number;
  value: number;
  height: number;
  digitClassName?: string;
}

function Digit({ place, value, height, digitClassName }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      className={cn('relative w-[1ch] overflow-hidden', digitClassName)}
      style={{ height }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

interface CounterProps {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: number[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColorClass?: string;
  fontWeight?: React.CSSProperties['fontWeight'];
  containerClassName?: string;
  counterClassName?: string;
  digitClassName?: string;
  gradientHeight?: number;
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [100, 10, 1],
  gap = 2,
  borderRadius = 4,
  horizontalPadding = 2,
  textColorClass = 'text-zinc-800 dark:text-zinc-100',
  fontWeight = 'bold',
  containerClassName,
  counterClassName,
  digitClassName,
}: CounterProps) {
  const height = fontSize + padding;

  return (
    <div className={cn('relative inline-block', containerClassName)}>
      <div
        className={cn(
          'flex overflow-hidden',
          textColorClass,
          counterClassName,
        )}
        style={{
          fontSize,
          fontWeight,
          borderRadius,
          gap: `${gap}px`,
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
          lineHeight: 1,
        }}
      >
        {places.map((place) => (
          <Digit
            key={place}
            place={place}
            value={value}
            height={height}
            digitClassName={digitClassName}
          />
        ))}
      </div>
    </div>
  );
}
