'use client';

import ImageCarousel from '@/app/_components/myItems/ImageSlider';
import { Separator } from '@/app/_components/ui/separator';
import { Button } from '@/app/_components/ui/button';
import { TipTapViewer } from '@/app/_components/dashboard/TipTapViewer';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { numberIcons } from '@/constants/icons';
import CountdownTimer from '@/app/_components/home/ItemCountDown';
import { TextMorph } from '@/app/_components/ui/text-morph';
import {
  IconAlertSquareRoundedFilled,
  IconGavel,
  IconHeartbeat,
  IconHeartFilled,
  IconLoader,
} from '@tabler/icons-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog';
import { useState, useTransition } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { BidSchema } from '@/app/_utils/schema';
import { addItemToWishlist, PlaceBidAction } from '@/app/actions';
import { toast } from 'sonner';
import type { Wishlist } from '@/types/wishlist';

interface ItemFormProps {
  data: {
    id: string;
    name: string;
    image: string[];
    startingBid: number;
    currentBid: number;
    bidInterval: number;
    description: string;
    endDate: Date;
    userId: string;
  };
  bids:
    | {
        user: {
          id: string;
          image: string | null;
          firstName: string | null;
          lastName: string | null;
        };
        amount: number;
        timestamp: Date;
      }[]
    | null;
  userID: string;
  wishlistInfo: Wishlist;
}

export default function ItemForm({
  data,
  bids,
  userID,
  wishlistInfo,
}: ItemFormProps) {
  const [warning, setWarning] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [isBidding, startBidding] = useTransition();
  const [isAddingToWishlist, startWishlist] = useTransition();
  const [wishlistForm] = useForm({
    onSubmit: (event) => {
      event.preventDefault();
      if (data.userId === userID) {
        setWishlist(true);
      } else if (wishlistInfo.items.some((item) => item.id === data.id)) {
        toast.error('Item is already in Wishlist');
      } else {
        startWishlist(() => {
          addItemToWishlist(data.id);
        });
      }
    },
  });

  const [bidForm, bidFields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: BidSchema });
    },
    onSubmit: (event, { formData }) => {
      event.preventDefault();
      if (data.userId === userID) {
        setWarning(true);
        return;
      } else if (bids?.[0]?.user?.id === userID) {
        toast.error('You are already the Top Bidder');
        return;
      } else if (data.endDate < new Date()) {
        toast.error('Bidding has ended for this Item');
        return;
      } else {
        startBidding(() => {
          PlaceBidAction(formData);
        });
      }
    },
  });

  return (
    data && (
      <section className="bg-muted font-display dark:border-muted-foreground/50 grid items-start gap-6 rounded-xl border shadow md:p-2 lg:grid-cols-2">
        <ImageCarousel images={data.image} className="p-4" />
        <div className="space-y-3 p-4">
          <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
          <h2 className="text-primary border-muted-foreground hover:bg-sidebar bg-background mt-3 size-fit rounded-lg border-2 border-dashed px-2 py-1 text-3xl font-bold">
            ₹{Number(data.currentBid).toLocaleString('en-IN')}
          </h2>
          <div className="flex gap-2">
            <form
              id={wishlistForm.id}
              onSubmit={wishlistForm.onSubmit}
              className="w-full"
            >
              <Button
                variant="secondary"
                type="submit"
                className="hover:bg-sidebar bg-background w-full"
              >
                {!isAddingToWishlist && <IconHeartFilled />}
                {isAddingToWishlist && (
                  <IconLoader
                    size={25}
                    strokeWidth={2.5}
                    className="animate-spin [animation-duration:3s]"
                  />
                )}
                {wishlistInfo.items.some((item) => item.id === data.id) ? (
                  <span>Added to Wishlist</span>
                ) : (
                  <TextMorph>
                    {isAddingToWishlist
                      ? 'Adding to Wishlist...'
                      : 'Add to Wishlist'}
                  </TextMorph>
                )}
              </Button>
            </form>
            <form
              id={bidForm.id}
              onSubmit={bidForm.onSubmit}
              className="w-full"
            >
              <input
                id={bidFields.currentBid.id}
                name={bidFields.currentBid.name}
                defaultValue={
                  Number(data.currentBid) + Number(data.bidInterval)
                }
                readOnly
                hidden
              />
              <input
                id={bidFields.itemId.id}
                name={bidFields.itemId.name}
                defaultValue={data.id}
                readOnly
                hidden
              />

              <Button type="submit" disabled={isBidding} className="size-full">
                {!isBidding && <IconGavel />}
                {isBidding && (
                  <IconLoader
                    size={25}
                    strokeWidth={2.5}
                    className="animate-spin [animation-duration:3s]"
                  />
                )}
                <TextMorph>
                  {isBidding ? 'Placing Bid...' : 'Place Bid'}
                </TextMorph>
              </Button>
            </form>
          </div>
          <div className="bg-sidebar rounded-md p-3 text-xl font-medium">
            {data.endDate > new Date() ? (
              <span>
                <ul className="flex gap-0.5">
                  <li>Bid Deadline:</li>&nbsp;
                  <li className="text-primary">
                    {Intl.DateTimeFormat('en-IN', {
                      dateStyle: 'long',
                    }).format(data.endDate)}
                  </li>
                </ul>
                <CountdownTimer date={data.endDate} />
              </span>
            ) : (
              <ul className="flex gap-0.5">
                <li>Bidding has ended on&nbsp;</li>
                <li className="text-primary">
                  {Intl.DateTimeFormat('en-IN', {
                    dateStyle: 'long',
                  }).format(data.endDate)}
                </li>
              </ul>
            )}
          </div>
          <div className="bg-sidebar flex items-center justify-around rounded-md p-2 text-xl font-medium">
            <div className="flex items-center gap-0.5">
              <span>Starting Bid:</span>
              &nbsp;
              <span className="text-primary font-bold">
                ₹{Number(data.startingBid).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <span>Bid Interval:</span>
              &nbsp;
              <span className="text-primary font-bold">
                ₹{Number(data.bidInterval).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <Separator className="my-2 h-0.5" />
          {bids && bids.length !== 0 && (
            <div className="bg-sidebar flex flex-col justify-center gap-2 rounded-xl p-2 md:p-3">
              {bids.map((bid, index) => {
                const Icon = numberIcons[index];
                return (
                  <ul
                    key={index}
                    className="bg-background relative flex justify-between gap-2 rounded-xl p-2 shadow-md transition-shadow duration-500 hover:shadow-sm max-md:flex-col"
                  >
                    <li className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icon className="text-muted-foreground/40 size-10" />
                    </li>
                    <span className="flex items-center justify-start gap-3">
                      <li className="border-muted-foreground bg-background rounded-sm border-2 border-dashed p-0.5">
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
                      <li className="z-10 text-base capitalize md:text-lg">
                        {bid.user.firstName}&nbsp;
                        {bid.user.lastName}
                      </li>
                    </span>

                    <span className="flex items-end justify-between md:flex-col">
                      <li className="font-medium">
                        ₹{bid.amount.toLocaleString('en-IN')}
                      </li>
                      <li className="text-xs capitalize">
                        {formatDistanceToNow(new Date(bid.timestamp), {
                          addSuffix: true,
                        })}
                      </li>
                    </span>
                  </ul>
                );
              })}
            </div>
          )}

          {bids?.length !== 0 && <Separator className="my-2 h-0.5" />}
          <h3 className="my-2 text-2xl font-bold">Item Description</h3>
          <article className="bg-sidebar rounded-xl p-2">
            <TipTapViewer json={JSON.parse(data.description)} />
          </article>
        </div>
        <Dialog
          open={warning || wishlist}
          onOpenChange={() => {
            setWarning(false);
            setWishlist(false);
          }}
        >
          <DialogContent className="max-w-sm">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle className="bg-primary/20 border-primary flex size-16 items-center justify-center rounded-full border-2 border-dashed">
                {warning && <IconAlertSquareRoundedFilled className="size-8" />}
                {wishlist && <IconHeartbeat className="size-8" />}
              </DialogTitle>
              <div className="text-2xl font-bold">
                {warning && <span>Action not Allowed</span>}
                {wishlist && <span>Cannot be Wishlisted</span>}
              </div>
            </DialogHeader>
            <DialogDescription className="text-center text-base font-medium">
              {warning &&
                'You cannot place a bid on an item you have listed for bidding.'}
              {wishlist &&
                'You cannot wishlist an item you have listed for bidding.'}
            </DialogDescription>
            <DialogFooter>
              <DialogClose className="flex w-full items-center justify-center gap-2">
                <Button variant={'secondary'}>Got It !!</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    )
  );
}
