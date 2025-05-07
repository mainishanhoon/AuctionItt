import { Skeleton } from '@/app/_components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-4">
        <div className="w-full max-w-sm space-y-2">
          {/* Skeleton for "Hello {user.firstName}!" */}
          <Skeleton className="h-8 w-40 rounded-md" />
          {/* Skeleton for description text */}
          <Skeleton className="h-6 w-100 rounded-md" />
        </div>

        {/* Skeleton for TabsList */}
        <div className="grid w-full max-w-96 grid-cols-2 gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 rounded-xl lg:grid-cols-4 lg:gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-30 w-full rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-[500px] w-full rounded-lg" />
    </div>
  );
}
