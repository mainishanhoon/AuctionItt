import { prisma } from '@/app/_utils/prisma';
import EmptyState from '@/app/_components/home/EmptyState';
import ItemForm from '@/app/_components/forms/ItemForm';
import { getUser } from '@/hooks/hooks';
import { Redis } from '@/app/_utils/redis';
import type { Wishlist } from '@/types/wishlist';

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
        startingBid: true,
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
  const rawWishlist = await Redis.get(`wishlist-${user.id}`);
  const wishlistData: Wishlist = (rawWishlist as Wishlist) || {
    userId: user.id,
    items: [],
  };

  return data ? (
    <ItemForm
      data={data}
      bids={bids}
      userID={user.id}
      wishlistInfo={wishlistData}
    />
  ) : (
    <EmptyState
      title="Item Not Found"
      description="The item you're looking for doesn't exist or may have been removed. Please try refreshing the page or explore other available items."
      text="Go Back to Home"
      href="/home"
    />
  );
}
