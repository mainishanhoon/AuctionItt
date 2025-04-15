import EmptyState from '@/app/_components/home/EmptyState';
import { ProductUpdationCard } from '@/app/_components/myItems/ItemCard';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';
import React from 'react';

export default async function ListingPage() {
  const user = await getUser();
  const data = await prisma.item.findMany({ where: { userId: user.id } });
  return data ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {data.map((item) => (
        // @ts-expect-error I will fix it later
        <ProductUpdationCard key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <EmptyState
      title="You have not is listed for Bidding"
      description="No items are currently open for bidding. Please check back later or explore other available categories."
      text="Refresh Page"
      href="/home"
    />
  );
}
