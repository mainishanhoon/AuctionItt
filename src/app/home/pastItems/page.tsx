import EmptyState from '@/app/_components/home/EmptyState';
import PastItemCard from '@/app/_components/pastItems/PastItemCard';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';

export default async function PastItemsPage() {
  const user = await getUser();

  const [data, myData] = await Promise.all([
    prisma.item.findMany({
      where: {
        endDate: {
          lt: new Date(),
        },
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        name: true,
        description: true,
        startingBid: true,
        image: true,
      },
    }),

    prisma.item.findMany({
      where: {
        userId: user.id,
        endDate: {
          lt: new Date(),
        },
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        name: true,
        description: true,
        startingBid: true,
        image: true,
      },
    }),
  ]);

  return (
    <Tabs defaultValue="AllItems" className="space-y-3">
      <TabsList className="bg-sidebar border-muted dark:border-sidebar-accent grid w-full max-w-96 grid-cols-2 border">
        <TabsTrigger value="AllItems">All Items</TabsTrigger>
        <TabsTrigger value="MyItems">My Items</TabsTrigger>
      </TabsList>
      <TabsContent
        value="AllItems"
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
      >
        {data.length !== 0 ? (
          data.map((item, index) => <PastItemCard key={index} item={item} />)
        ) : (
          <EmptyState
            title="No Past Auction Items to Display"
            description="There are currently no items available in past events. Check back later or explore other auction categories to find active listings."
            text="Refresh Page"
            href="/home/pastItems"
            className="col-span-1 md:col-span-2 lg:col-span-4"
          />
        )}
      </TabsContent>

      <TabsContent
        value="MyItems"
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {myData.length !== 0 ? (
          myData.map((item, index) => <PastItemCard key={index} item={item} />)
        ) : (
          <EmptyState
            title="No Past Auction Items to Display"
            description="There are currently no items available in past events. Check back later or explore other auction categories to find active listings."
            text="Refresh Page"
            href="/home/pastItems"
            className="col-span-1 md:col-span-2 lg:col-span-4"
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
