import EmptyState from '@/components/EmptyState';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function DashboardPage() {
  const data = await prisma.items.findMany();
  return data ? (
    <EmptyState
      title="You haven't added any items yet"
      description="It looks like you haven't added any items yet. Start by adding a new product to manage your inventory efficiently."
      text="Add Items"
      href="/home/dashboard/create"
    />
  ) : (
    <div>Items</div>
  );
}
