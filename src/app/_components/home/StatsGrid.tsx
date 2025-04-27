import { cn } from '@/lib/utils';
import {
  IconExternalLink,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';
import Link from 'next/link';

interface StatsCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: 'up' | 'down';
  };
  icon: React.ReactNode;
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change.trend === 'up';
  const trendColor = isPositive ? 'text-emerald-500' : 'text-red-500';

  return (
    <div className="group bg-muted relative rounded-2xl border-2 bg-gradient-to-br p-4 before:absolute before:inset-y-8 before:right-0 before:w-px last:before:hidden">
      <div className="relative flex items-center gap-4">
        <IconExternalLink
          className="absolute top-0 right-0 text-emerald-500 opacity-0 transition-opacity group-has-[a:hover]:opacity-100"
          size={20}
          aria-hidden="true"
        />
        {/* Icon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-600/50 bg-emerald-600/25 p-2 text-emerald-500 max-md:hidden lg:size-15">
          {icon}
        </div>
        {/* Content */}
        <div>
          <Link
            prefetch={false}
            href="#"
            className="text-muted-foreground/60 text-xs font-medium tracking-wide uppercase before:absolute before:inset-0 md:text-sm lg:text-base"
          >
            {title}
          </Link>
          <div className="mb-2 text-2xl font-semibold">{value}</div>
          <div className="text-muted-foreground/60 text-xs">
            <span className={cn('flex gap-1 font-medium', trendColor)}>
              {isPositive ? (
                <IconTrendingUp
                  className="opacity-80"
                  size={16}
                  aria-hidden="true"
                />
              ) : (
                <IconTrendingDown
                  className="opacity-80"
                  size={16}
                  aria-hidden="true"
                />
              )}
              {change.value}
            </span>
            last 30 days
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatsGridProps {
  stats: StatsCardProps[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl lg:grid-cols-4 lg:gap-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
