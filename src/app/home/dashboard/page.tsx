import { getUser } from '@/hooks/hooks';
import Stats from '@/app/_components/dashboard/Stats';
import ItemsTable from '@/app/_components/dashboard/ItemsTable';
import { prisma } from '@/app/_utils/prisma';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';
import { RevenueGraph } from '@/app/_components/dashboard/RevenueGraph';
import { RecentBids } from '@/app/_components/dashboard/RecentBids';

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
      startingBid: true,
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
    <Tabs defaultValue="table" className="flex flex-col gap-4">
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
        <TabsList className="bg-sidebar border-muted dark:border-sidebar-accent grid w-full max-w-96 grid-cols-2 border">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>
      </div>
      <Stats />
      <TabsContent value="graph">
        <div className="grid grid-rows-[auto,auto] gap-2 md:gap-3 lg:gap-5">
          <div className="grid gap-2 md:gap-3 lg:grid-cols-3 lg:gap-5">
            <div className="lg:col-span-2">
              <RevenueGraph />
            </div>
            <RecentBids />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="table">
        <ItemsTable tableData={data} />
      </TabsContent>
    </Tabs>
  );
}
