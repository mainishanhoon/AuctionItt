import { Skeleton } from '@/app/_components/ui/skeleton';

export default function ProductLoadingRoute() {
  return (
    <div className="grid items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24">
      <div>
        <Skeleton className="h-[600px] w-full" />
        <div className="mt-6 grid grid-cols-5 gap-4">
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
        </div>
      </div>

      <div>
        <Skeleton className="h-12 w-56" />
        <Skeleton className="mt-4 h-12 w-36" />
        <Skeleton className="mt-4 h-60 w-full" />
        <Skeleton className="mt-5 h-12 w-full" />
      </div>
    </div>
  );
}
