import ItemUpdationForm from '@/app/_components/forms/ItemUpdationForm';
import EmptyState from '@/app/_components/home/EmptyState';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';
import { notFound } from 'next/navigation';

interface Params {
  params: Promise<{ itemId: string }>;
}
async function getData(itemId: string, userId: string) {
  const data = await prisma.item.findUnique({
    where: {
      id: itemId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditItemRoute({ params }: Params) {
  const { itemId } = await params;
  const user = await getUser();
  const data = await getData(itemId, user.id);

  return data ? (
    <ItemUpdationForm data={data} />
  ) : (
    <EmptyState
      title="Item Not Found"
      description="The item you're looking for doesn't exist or may have been removed. Please try refreshing the page or explore other available items."
      text="Go Back Home"
      href="/home"
    />
  );
}
