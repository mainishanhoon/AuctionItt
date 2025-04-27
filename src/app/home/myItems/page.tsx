import EmptyState from '@/app/_components/home/EmptyState';
import ItemUpdationCard from '@/app/_components/myItems/ItemCard';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_components/ui/tabs';

export default async function MyItemsPage() {
  const user = await getUser();

  const [draft, published] = await Promise.all([
    prisma.item.findMany({
      where: {
        userId: user.id,
        status: 'DRAFT',
        endDate: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        startingPrice: true,
        image: true,
      },
    }),
    prisma.item.findMany({
      where: {
        userId: user.id,
        status: 'PUBLISHED',
        endDate: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        startingPrice: true,
        image: true,
      },
    }),
  ]);

  return (
    <Tabs defaultValue="draft" className="space-y-3">
      <TabsList className="bg-sidebar border-muted dark:border-sidebar-accent grid w-full max-w-96 grid-cols-2 border">
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
      </TabsList>
      <TabsContent
        value="draft"
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
      >
        {draft.length !== 0 ? (
          draft.map((item, index) => (
            <ItemUpdationCard key={index} item={item} />
          ))
        ) : (
          <EmptyState
            title="No Draft Items"
            description="You haven't saved any drafts yet. Start drafting new items and save them for later publishing."
            text="Refresh Page"
            href="/home/myItems"
            className="col-span-1 md:col-span-2 lg:col-span-4"
          />
        )}
      </TabsContent>

      <TabsContent
        value="published"
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
      >
        {published.length !== 0 ? (
          published.map((item, index) => (
            <ItemUpdationCard key={index} item={item} />
          ))
        ) : (
          <EmptyState
            title="No Published Items"
            description="You haven't published any items yet. Publish your drafts or create new listings to get started!"
            text="Refresh Page"
            href="/home/myItems"
            className="col-span-1 md:col-span-2 lg:col-span-4"
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
