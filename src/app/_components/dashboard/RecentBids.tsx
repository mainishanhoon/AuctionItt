import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';
import EmptyState from '@/app/_components/home/EmptyState';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { numberIcons } from '@/constants/icons';

export async function RecentBids() {
  const user = await getUser();

  const bids = await prisma.bid.findMany({
    where: {
      item: {
        userId: user.id,
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
    take: 5,
    select: {
      timestamp: true,
      amount: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      item: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="text-xl">Recent Bids</CardTitle>
        <CardDescription className="font-medium">
          5 Most Recent Bidders
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {bids.length !== 0 ? (
          bids.map((bid, index) => {
            const Icon = numberIcons[index];
            return (
              <div
                className="bg-background relative flex items-center gap-2 rounded-xl p-2 md:gap-4 md:p-4"
                key={index}
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Icon className="text-muted-foreground/40 size-10" />
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Image
                      src={bid.user?.image ?? '/avatar/avatar-5.webp'}
                      alt={bid.user?.name ?? 'No Bidder'}
                      width={30}
                      height={30}
                      draggable={false}
                      loading="lazy"
                      className="rounded-sm object-cover"
                    />
                    <span className="text-sm leading-none font-medium capitalize">
                      {bid.user?.name ?? 'No Bidder'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs font-medium">
                    Bid on&nbsp;
                    <span className="capitalize">
                      {bid.item?.name ?? 'No Item'}
                    </span>
                  </p>
                </div>
                <div className="ml-auto flex flex-col gap-1">
                  <span className="ml-auto text-sm leading-none font-medium capitalize">
                    +₹{bid.amount}
                  </span>
                  <span className="ml-auto text-xs font-medium text-nowrap">
                    {formatDistanceToNow(new Date(bid.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState
            title="No Recent Bids to Display"
            description="There are currently no bids placed on your items. Check back later to see new activity!"
            text="Refresh Page"
            href="/home/dashboard"
            className="bg-background col-span-1 md:col-span-2 lg:col-span-4"
          />
        )}
      </CardContent>
    </Card>
  );
}
