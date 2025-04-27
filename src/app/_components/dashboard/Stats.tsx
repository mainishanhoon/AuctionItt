import {
  IconCoinRupee,
  IconPentagram,
  IconTopologyStarRing3,
  IconUserSquareRounded,
} from '@tabler/icons-react';
import { StatsGrid } from '@/app/_components/home/StatsGrid';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';
import { Suspense } from 'react';
import { Skeleton } from '@/app/_components/ui/skeleton';

export default async function Stats() {
  const user = await getUser();

  const [
    thisMonthItemsCount,
    lastMonthItemsCount,
    thisMonthPublishedCount,
    lastMonthPublishedCount,
    thisMonthDraftCount,
    lastMonthDraftCount,
  ] = await Promise.all([
    prisma.item.findMany({
      where: {
        userId: user.id,
        createdAt: {
          lte: new Date(),
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
        currentBid: true,
      },
    }),
    prisma.item.findMany({
      where: {
        userId: user.id,
        createdAt: {
          lte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
        currentBid: true,
      },
    }),

    prisma.item.findMany({
      where: {
        userId: user.id,
        status: 'PUBLISHED',
        createdAt: {
          lte: new Date(),
          gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
      },
    }),

    prisma.item.findMany({
      where: {
        userId: user.id,
        status: 'PUBLISHED',
        createdAt: {
          lte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
      },
    }),

    prisma.item.findMany({
      where: {
        userId: user.id,
        status: 'DRAFT',
        createdAt: {
          lte: new Date(),
          gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
      },
    }),

    prisma.item.findMany({
      where: {
        userId: user.id,
        status: 'DRAFT',
        createdAt: {
          lte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
      },
      select: {
        id: true,
      },
    }),
  ]);

  let itemValue = 0;
  if (lastMonthItemsCount.length > 0) {
    itemValue =
      ((thisMonthItemsCount.length - lastMonthItemsCount.length) /
        lastMonthItemsCount.length) *
      100;
  } else if (thisMonthItemsCount.length > 0) {
    itemValue = 100;
  }

  let publishedValue = 0;
  if (lastMonthPublishedCount.length > 0) {
    publishedValue =
      ((thisMonthPublishedCount.length - lastMonthPublishedCount.length) /
        lastMonthPublishedCount.length) *
      100;
  } else if (thisMonthPublishedCount.length > 0) {
    publishedValue = 100;
  }

  let draftValue = 0;
  if (lastMonthDraftCount.length > 0) {
    draftValue =
      ((thisMonthDraftCount.length - lastMonthDraftCount.length) /
        lastMonthDraftCount.length) *
      100;
  } else if (thisMonthDraftCount.length > 0) {
    draftValue = 100;
  }

  const thisMonthRevenue = thisMonthItemsCount.reduce(
    (acc, item) => acc + (item.currentBid || 0),
    0,
  );

  const lastMonthRevenue = lastMonthItemsCount.reduce(
    (acc, item) => acc + (item.currentBid || 0),
    0,
  );

  let revenueValue = 0;
  if (lastMonthRevenue > 0) {
    revenueValue =
      ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
  } else if (thisMonthRevenue > 0) {
    revenueValue = 100;
  }

  return (
    <Suspense fallback={<StatsLoading />}>
      <StatsGrid
        stats={[
          {
            title: 'Total Items',
            value: `${thisMonthItemsCount.length}`,
            change: {
              value: `${thisMonthItemsCount.reduce((acc, item) => acc + (item.currentBid || 0), 0) > 0 ? '+' : ''}${itemValue.toFixed(2)}%`,
              trend: itemValue >= 0 ? 'up' : 'down',
            },
            icon: <IconTopologyStarRing3 className="size-full" />,
          },
          {
            title: 'Published Items',
            value: `${thisMonthPublishedCount.length}`,
            change: {
              value: `${publishedValue > 0 ? '+' : ''}${publishedValue.toFixed(2)}%`,
              trend: publishedValue >= 0 ? 'up' : 'down',
            },
            icon: <IconUserSquareRounded className="size-full" />,
          },
          {
            title: 'Total Revenue',
            value: `${thisMonthRevenue}`,
            change: {
              value: `${revenueValue > 0 ? '+' : ''}${revenueValue.toFixed(2)}%`,
              trend: revenueValue >= 0 ? 'up' : 'down',
            },
            icon: <IconCoinRupee className="size-full" />,
          },
          {
            title: 'Draft Items',
            value: `${thisMonthDraftCount.length}`,
            change: {
              value: `${draftValue > 0 ? '+' : ''}${draftValue.toFixed(2)}%`,
              trend: draftValue >= 0 ? 'up' : 'down',
            },
            icon: <IconPentagram className="size-full" />,
          },
        ]}
      />
    </Suspense>
  );
}

function StatsLoading() {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl lg:grid-cols-4 lg:gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-[150px] w-full rounded-lg" />
      ))}
    </div>
  );
}
