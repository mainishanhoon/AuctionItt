import { getUser } from '@/hooks/hooks';
import { Button } from '@/app/_components/ui/button';
import Stats from '@/app/_components/dashboard/Stats';
import Link from 'next/link';
import ItemsTable from '@/app/_components/dashboard/ItemsTable';
import { prisma } from '@/app/_utils/prisma';

export default async function DashboardPage() {
  const user = await getUser();
  const data = await prisma.item.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      currentBid: true,
      startingPrice: true,
      bidInterval: true,
      endDate: true,
      status: true,
      bids: {
        select: {
          user: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold capitalize">
            Hello {user.firstName}!
          </h1>
          <p className="text-muted-foreground text-sm">
            Quickly view your auction items and easily manage listings or place
            new ones anytime.
          </p>
        </div>
        <Button asChild>
          <Link href="/home/addItem">Place New Item</Link>
        </Button>
      </div>
      <Stats />
      <ItemsTable tableData={data} />
    </section>
  );
}
