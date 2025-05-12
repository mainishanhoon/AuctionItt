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
          <DrawerTitle className="text-center text-2xl">
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
            <div className="border-muted flex flex-col gap-3 rounded-3xl border-2 border-dashed p-4">
              {data.items.map((item, index) => (
                <ul
                  key={index}
                  className="bg-card rounded-lg border p-4 shadow-sm"
                >
                  <li>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="aspect-square rounded-lg object-cover"
                    />
                  </li>
                  <li className="text-lg font-semibold capitalize">
                    {item.name}
                  </li>
                  <li>{item.bidInterval}</li>
                  <li>{item.startingBid}</li>
                  <li>
                    {Intl.DateTimeFormat('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'medium',
                    }).format(new Date(item.endDate))}
                  </li>
                  <li>{item.topBidder}</li>
                  <li className="text-muted-foreground text-sm">
                    Current Bid: ₹{item.currentBid}
                  </li>
                  <li>
                    <Form
                      action={async () => {
                        'use server';
                        await removeItemFromWishlist(user.id, item.id);
                      }}
                    >
                      <SubmitButton
                        icon={<IconTrash />}
                        text="Remove from Wishlist"
                        loadingText="Removing from Wishlist..."
                        buttonVariant="destructive"
                        loadingVariant="outline"
                      />
                    </Form>
                  </li>
                </ul>
              ))}
            </div>
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
