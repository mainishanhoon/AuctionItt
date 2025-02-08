import { fetchUser } from '@/hooks/hooks';
import { prisma } from '@/lib/prisma';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, CircleFadingPlus } from 'lucide-react';
import { DataTable } from '@/components/table/DataTable';
import EmptyState from '@/components/EmptyState';
import { columns } from '@/components/table/Columns';

async function getData() {
  const data = await prisma.items.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return data;
}

export default async function DashboardPage() {
  const session = await fetchUser();
  const data = await prisma.items.findMany({
    where: {
      userId: session.user?.id!,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return data ? (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/home">
              <ChevronLeft size={25} strokeWidth={3} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-wider">Products</h1>
        </div>
        <Button asChild className="flex items-center gap-x-2">
          <Link href="/dashboard/create">
            <CircleFadingPlus size={20} strokeWidth={3} />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl tracking-wider">
            Product Details
          </CardTitle>
          <CardDescription className="font-bold tracking-wider">
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={data} columns={columns} />
        </CardContent>
      </Card>
    </section>
  ) : (
    <EmptyState
      title="You haven't added any items yet"
      description="It looks like you haven't added any items yet. Start by adding a new product to manage your inventory efficiently."
      text="Add Items"
      href="/home/dashboard/create"
    />
  );
}
