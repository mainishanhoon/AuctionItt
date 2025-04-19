import ImageCarousel from '@/app/_components/myItems/ImageSlider';
import { prisma } from '@/app/_utils/prisma';
import { notFound } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { Badge } from '@/app/_components/ui/badge';
import { Separator } from '@/app/_components/ui/separator';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { TipTapViewer } from '@/app/_components/dashboard/TipTapViewer';
import {
  IconCoinRupee,
  IconTrophy,
  IconTruck,
  IconWorld,
} from '@tabler/icons-react';
import EmptyState from '@/app/_components/home/EmptyState';

interface Params {
  params: Promise<{ itemId: string }>;
}

async function getData(productId: string) {
  const data = await prisma.item.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      startingPrice: true,
      description: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ItemRoute({ params }: Params) {
  noStore();
  const { itemId } = await params;
  const data = await getData(itemId);

  return data ? (
    <section className="grid grid-cols-1 items-start gap-6 sm:px-16 md:grid-cols-2 lg:gap-x-24">
      <ImageCarousel images={data.image} />
      <div>
        <h1 className="text-3xl font-bold tracking-wider">{data.name}</h1>
        <Badge
          variant="secondary"
          className="text-primary mt-3 rounded-lg text-3xl font-bold tracking-wider"
        >
          ₹{data.startingPrice}
        </Badge>
        <div className="my-5 flex gap-2">
          <Button
            asChild
            variant="secondary"
            className="border-muted-foreground w-full space-x-2 border-2"
          >
            <Link href={`/product/`}>
              <span className="tracking-wider">Add to Cart</span>
            </Link>
          </Button>
          <Button asChild className="w-full space-x-2">
            <Link href={`/product/`}>
              <span className="tracking-widest">Place Bid</span>
            </Link>
          </Button>
        </div>
        <Separator className="my-2 h-0.5" />
        <TipTapViewer json={JSON.parse(data.description)} />
        <div className="flex justify-center md:justify-start">
          <div className="my-3 grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-4">
            <Badge
              variant="secondary"
              className="size-24 flex-col justify-center gap-2 rounded-lg text-center"
            >
              <IconTrophy size={35} color="var(--muted-foreground)" />
              <span className="text-muted-foreground text-xs tracking-wider">
                Top Brand
              </span>
            </Badge>
            <Badge
              variant="secondary"
              className="size-24 flex-col justify-center gap-2 rounded-lg text-center"
            >
              <IconWorld size={35} color="var(--muted-foreground)" />
              <span className="text-muted-foreground text-xs tracking-wider">
                Secure Transaction
              </span>
            </Badge>
            <Badge
              variant="secondary"
              className="size-24 flex-col justify-center gap-2 rounded-lg text-center"
            >
              <IconTruck size={35} color="var(--muted-foreground)" />
              <span className="text-muted-foreground text-xs tracking-wider">
                Free Delivery
              </span>
            </Badge>
            <Badge
              variant="secondary"
              className="size-24 flex-col justify-center gap-2 rounded-lg text-center"
            >
              <IconCoinRupee size={35} color="var(--muted-foreground)" />
              <span className="text-muted-foreground text-xs font-bold tracking-wider">
                Pay on (Delivery)
              </span>
            </Badge>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-wider">Product Details:</h3>
      </div>
    </section>
  ) : (
    <EmptyState
      title="Item Not Found"
      description="The item you're looking for doesn't exist or may have been removed. Please try refreshing the page or explore other available items."
      text="Go Back Home"
      href="/home"
    />
  );
}
