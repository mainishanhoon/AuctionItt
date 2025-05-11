import { prisma } from '@/app/_utils/prisma';
import EmptyState from '@/app/_components/home/EmptyState';
import ItemForm from '@/app/_components/forms/ItemForm';
import { getUser } from '@/hooks/hooks';

interface Params {
  params: Promise<{ itemId: string }>;
}

async function getData(itemId: string) {
  const [data, bids] = await Promise.all([
    prisma.item.findUnique({
      where: {
        id: itemId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        startingPrice: true,
        bidInterval: true,
        currentBid: true,
        description: true,
        endDate: true,
        userId: true,
      },
    }),

    prisma.bid.findMany({
      where: {
        itemId: itemId,
      },
      select: {
        user: {
          select: { id: true, image: true, firstName: true, lastName: true },
        },
        amount: true,
        timestamp: true,
      },
      orderBy: { timestamp: 'desc' },
      take: 5,
    }),
  ]);

  return {
    data,
    bids,
  };
}
export default async function ItemRoute({ params }: Params) {
  const { itemId } = await params;
  const user = await getUser();
  const { data, bids } = await getData(itemId);

  return data ? (
    <ItemForm data={data} bids={bids} userID={user.id} />
  ) : (
    <EmptyState
      title="Item Not Found"
      description="The item you're looking for doesn't exist or may have been removed. Please try refreshing the page or explore other available items."
      text="Go Back Home"
      href="/home"
    />
  );
}
