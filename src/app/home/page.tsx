import EmptyState from '@/components/EmptyState';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function ListingPage() {
  const data = await prisma.items.findMany();
  return data ? (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {data.map((item) => (
        <ProductCard
          key={item.id}
          item={{
            ...item,
            price: Number(item.price),
          }}
        />
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
