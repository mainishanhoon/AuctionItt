'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isDark = theme === 'dark';

  return (
    <Switch
      checked={isDark}
      onCheckedChange={() => setTheme(isDark ? 'light' : 'dark')}
      checkedIcon={
        <FaMoon
          size={12}
          color="hsl(var(--muted-foreground))"
          className="ml-1 mt-1"
        />
      }
      uncheckedIcon={
        <FaSun
          size={12}
          color="hsl(var(--muted-foreground))"
          className="ml-1 mt-1"
        />
      }
    />
  );
}
