import { getUser } from '@/hooks/hooks';
import { prisma } from '@/app/_utils/prisma';
import ContactsTable from '@/app/_components/dashboard/ContactsTable';
import { Button } from '@/app/_components/ui/button';
import Stats from '@/app/_components/dashboard/Stats';
import EmptyState from '@/app/_components/home/EmptyState';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await getUser();
  const data = await prisma.items.findMany({
    where: {
      userId: String(user?.id),
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
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Hello {user.firstName}!</h1>
          <p className="text-muted-foreground text-sm">
            Here&apos;s an overview of your items you have put on bids. Manage
            or create new ones with ease!
          </p>
        </div>
        <Button asChild>
          <Link href="/home/dashboard/create">Add Contact</Link>
        </Button>
      </div>
      <Stats />
      <ContactsTable />
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
