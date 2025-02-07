import EmptyState from '@/components/EmptyState';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function ListingPage() {
  const data = await prisma.items.findMany();
  return data ? (
    <EmptyState
      title="No Items Available for Bidding"
      description="There are currently no items open for bidding. Check back later or explore other categories."
      text="Refresh Page"
      href="/home"
    />
  ) : (
    <div>Items</div>
  );
}
