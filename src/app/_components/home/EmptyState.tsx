import { Button } from '@/app/_components/ui/button';
import { cn } from '@/lib/utils';
import { IconHexagonPlus, IconInfoSquareRounded } from '@tabler/icons-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  href: string;
  text: string;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  href,
  text,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'bg-muted border-muted-foreground flex flex-col items-center justify-center rounded-3xl border-2 border-dashed',
        className,
      )}
    >
      <div className="flex size-full flex-col items-center justify-center p-8 text-center">
        <div className="bg-primary/20 flex size-24 items-center justify-center rounded-full">
          <IconInfoSquareRounded
            strokeWidth={3}
            className="text-primary size-16"
          />
        </div>
        <h2 className="mt-6 text-xl font-medium md:text-3xl">{title}</h2>
        <p className="text-muted-foreground mx-auto mt-2 mb-8 max-w-xl text-center text-xs leading-tight tracking-wide md:text-base">
          {description}
        </p>

        <Link href={href}>
          <Button>
            <IconHexagonPlus size={25} strokeWidth={2.5} />
            <p className="font-medium">{text}</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
