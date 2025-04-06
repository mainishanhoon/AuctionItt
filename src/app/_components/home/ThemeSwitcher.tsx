'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/app/_components/ui/switch';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent hydration mismatch

  const isDark = theme === 'dark';

  return (
    <div className="relative inline-grid h-8 grid-cols-[1fr_1fr] items-center">
      <Switch
        checked={isDark}
        onCheckedChange={() => setTheme(isDark ? 'light' : 'dark')}
        className="peer data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto p-px [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
      />
      <span className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-7 items-center justify-center text-center">
        <IconSun size={16} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-7 items-center justify-center text-center">
        <IconMoon size={16} strokeWidth={2} aria-hidden="true" />
      </span>
    </div>
  );
}
