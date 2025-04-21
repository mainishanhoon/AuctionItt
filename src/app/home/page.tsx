import EmptyState from '@/app/_components/home/EmptyState';
import ItemCard from '@/app/_components/home/ItemCard';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';

export default async function ListingPage() {
  const user = await getUser();

  const data = await prisma.item.findMany({
    where: {
      userId: {
        not: user.id,
      },
    },
  });
  return data.length !== 0 ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}
    </div>
  ) : (
    <EmptyState
      title="No Item is listed for Bidding"
      description="No items are currently open for bidding. Please check back later or explore other available categories."
      text="Refresh Page"
      href="/home"
    />
  );
}
