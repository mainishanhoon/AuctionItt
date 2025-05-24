import { Skeleton } from '@/app/_components/ui/skeleton';

export default function ProductLoadingRoute() {
  return (
    <div className="grid gap-5 p-2 md:p-4 xl:grid-cols-2">
      <div className="flex flex-col items-center justify-center">
        <Skeleton className="md:size-96" />

        <span className="mt-4 flex flex-wrap justify-center gap-3">
          <Skeleton className="size-16 md:size-24" />
          <Skeleton className="size-16 md:size-24" />
          <Skeleton className="size-16 md:size-24" />
          <Skeleton className="size-16 md:size-24" />
        </span>
      </div>

      <div>
        <Skeleton className="h-12 w-56" />
        <Skeleton className="mt-4 h-12 w-36" />
        <div className="grid h-10 mt-4 w-full grid-cols-2 gap-2">
          <Skeleton className="size-full rounded-md" />
          <Skeleton className="size-full rounded-md" />
        </div>
        <Skeleton className="mt-4 h-60 w-full" />
        <Skeleton className="mt-5 h-12 w-full" />
      </div>
    </div>
  );
}
