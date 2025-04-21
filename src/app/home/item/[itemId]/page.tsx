import ImageCarousel from '@/app/_components/myItems/ImageSlider';
import { prisma } from '@/app/_utils/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import { Badge } from '@/app/_components/ui/badge';
import { Separator } from '@/app/_components/ui/separator';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { TipTapViewer } from '@/app/_components/dashboard/TipTapViewer';
import EmptyState from '@/app/_components/home/EmptyState';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Form from 'next/form';
import { placeBids } from '@/app/actions';
import { numberIcons } from '@/constants/icons';

interface Params {
  params: Promise<{ itemId: string }>;
}

async function getData(itemId: string) {
  const [data, bids] = await Promise.all([
    prisma.item.findUnique({
      where: {
        id: itemId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        startingPrice: true,
        description: true,
      },
    }),

    prisma.bid.findMany({
      where: {
        itemId: itemId,
      },
      select: {
        user: {
          select: { image: true, firstName: true, lastName: true },
        },
        amount: true,
        timestamp: true,
      },
      orderBy: { timestamp: 'desc' },
      take: 5,
    }),
  ]);

  return {
    data,
    bids,
  };
}
export default async function ItemRoute({ params }: Params) {
  noStore();
  const { itemId } = await params;
  const { data, bids } = await getData(itemId);

  return data ? (
    <section className="grid items-start gap-6 p-4 md:p-2 lg:grid-cols-2">
      <ImageCarousel images={data.image} />
      <div>
        <h1 className="font-display text-3xl font-bold capitalize">
          {data.name}
        </h1>
        <Badge
          variant="outline"
          className="text-primary border-muted-foreground font-display mt-3 rounded-lg border-2 border-dashed text-3xl font-bold"
        >
          ₹{data.startingPrice}
        </Badge>
        <div className="my-5 flex gap-2">
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/product/`}>
              <span className="tracking-wider">Add to Cart</span>
            </Link>
          </Button>
          <Form
            action={placeBids}
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex w-full cursor-pointer items-center justify-center rounded-md"
          >
            <input name="ItemID" defaultValue={data.id} hidden />
            <button
              type="submit"
              className="size-full cursor-pointer rounded-md"
            >
              Place Bid
            </button>
          </Form>
        </div>
        <Separator className="my-2 h-0.5" />
        <div className="bg-sidebar flex flex-col justify-center gap-2 rounded-xl p-2 md:gap-4 md:p-4">
          {bids.map((bid, index) => {
            const Icon = numberIcons[index];

            return (
              <ul
                key={index}
                className="bg-background font-display relative flex justify-between gap-2 rounded-xl p-4 max-md:flex-col"
              >
                <li className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Icon className="size-10 text-muted" />
                </li>

                <span className="flex items-center justify-start gap-3">
                  <li>
                    <Image
                      src={bid.user.image as string}
                      alt={`${bid.user.firstName?.charAt(0)} ${bid.user.lastName?.charAt(0)}`}
                      width={25}
                      height={25}
                      draggable={false}
                      loading="lazy"
                      className="size-8 rounded-sm md:size-10"
                    />
                  </li>
                  <li className="text-base md:text-lg z-10">
                    {bid.user.firstName}&nbsp;
                    {bid.user.lastName}
                  </li>
                </span>

                <span className="flex items-end justify-between md:flex-col">
                  <li className="font-medium">₹{bid.amount}</li>
                  <li className="text-xs">
                    {formatDistanceToNow(new Date(bid.timestamp), {
                      addSuffix: true,
                    })}
                  </li>
                </span>
              </ul>
            );
          })}
        </div>

        {bids.length !== 0 && <Separator className="my-2 h-0.5" />}
        <h3 className="font-display text-2xl font-bold">Item Description</h3>
        <article>
          <TipTapViewer json={JSON.parse(data.description)} />
        </article>
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
