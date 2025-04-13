import EmptyState from '@/app/_components/home/EmptyState';
import { ProductCard } from '@/app/_components/home/ProductCard';
import { prisma } from '@/app/_utils/prisma';
import React from 'react';

export default async function ListingPage() {
  const data = await prisma.item.findMany();

  return data ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((item) => (
        // @ts-expect-error I will fix it later
        <ProductCard key={item.id} item={item} />
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
