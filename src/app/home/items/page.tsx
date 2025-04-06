import EmptyState from '@/app/_components/home/EmptyState';
import { ProductCard } from '@/app/_components/home/ProductCard';
import { prisma } from '@/app/_utils/prisma';
import React from 'react';

export default async function ListingPage() {
  const data = await prisma.items.findMany();
  return data ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <EmptyState
      title="No Items Available for Bidding"
      description="There are currently no items open for bidding. Check back later or explore other categories."
      text="Refresh Page"
      href="/home"
    />
  );
}
