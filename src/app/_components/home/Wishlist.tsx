import { getUser } from '@/hooks/hooks';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/app/_components/ui/drawer';
import { IconHeart, IconTrash } from '@tabler/icons-react';
import EmptyState from '@/app/_components/home/EmptyState';
import type { Wishlist } from '@/types/wishlist';
import { Redis } from '@/app/_utils/redis';
import Form from 'next/form';
import { removeItemFromWishlist } from '@/app/actions';
import { SubmitButton } from './Buttons';
import Image from 'next/image';
import { ScrollArea } from '@/app/_components/ui/scroll-area';

export default async function WishlistDrawer() {
  const user = await getUser();
  const rawWishlist = await Redis.get(`wishlist-${user.id}`);
  const data: Wishlist = (rawWishlist as Wishlist) || {
    userId: user.id,
    items: [],
  };

  return (
    <Drawer>
      <DrawerTrigger className="relative">
        <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-xs font-bold">
          {data.items.length}
        </span>
        <IconHeart className="mt-0.5 size-8 cursor-pointer rounded-sm border p-1" />
      </DrawerTrigger>
      <DrawerContent className="rounded-t-3xl text-center">
        <DrawerHeader>
          <DrawerTitle className="text-center font-display text-2xl">
            Your Wishlist
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4 pb-4">
          {data.items.length === 0 ? (
            <EmptyState
              title="No Items in Wishlist"
              description="You haven't added any items to your wishlist yet. Browse items and add your favorites to keep track of them."
              text="Browse Items"
              href="/home"
            />
          ) : (
            <ScrollArea className="border-muted max-w-full max-h-[60vh] rounded-3xl border-2 border-dashed p-4">
              <div className='flex flex-wrap gap-4'>
                {data.items.map((item, index) => (
                  <ul
                    key={index}
                    className="bg-card grid max-w-md grid-cols-2 items-center gap-4 rounded-lg border p-4 shadow-sm transition hover:shadow-md"
                  >
                    <li className="border-muted-foreground rounded-lg border border-dashed p-0.5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        loading="lazy"
                        draggable={false}
                        unoptimized
                        className="aspect-square size-full rounded-lg object-cover"
                      />
                    </li>
                    <div className="text-left font-medium font-display">
                      <li className="capitalize">
                        <span>Name:</span> <span>{item.name}</span>
                      </li>
                      <li>
                        <span>Bid Interval:</span>&nbsp;
                        <span>{item.bidInterval.toLocaleString('en-IN')}</span>
                      </li>
                      <li>
                        <span>Starting Bid:</span>&nbsp;
                        <span>{item.startingBid.toLocaleString('en-IN')}</span>
                      </li>
                      <li>
                        <span>Name:</span>&nbsp;
                        <span>
                          {Intl.DateTimeFormat('en-IN', {
                            dateStyle: 'medium',
                          }).format(new Date(item.endDate))}
                        </span>
                      </li>
                      <li>
                        <span>Top Bidder:</span>&nbsp;
                        <span className="truncate capitalize">
                          {item.topBidder}
                        </span>
                      </li>
                      <li>
                        <span>Current Bid:</span>&nbsp;
                        <span>₹{item.currentBid.toLocaleString('en-IN')}</span>
                      </li>
                      <li className="mt-2">
                        <Form
                          action={async () => {
                            'use server';
                            await removeItemFromWishlist(user.id, item.id);
                          }}
                        >
                          <SubmitButton
                            icon={<IconTrash />}
                            text="Remove"
                            loadingText="Removing..."
                            buttonVariant="destructive"
                            loadingVariant="outline"
                          />
                        </Form>
                      </li>
                    </div>
                  </ul>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring mx-auto cursor-pointer rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
