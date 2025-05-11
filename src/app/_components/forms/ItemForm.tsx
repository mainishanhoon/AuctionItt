'use client';

import ImageCarousel from '@/app/_components/myItems/ImageSlider';
import { Separator } from '@/app/_components/ui/separator';
import { Button } from '@/app/_components/ui/button';
import { TipTapViewer } from '@/app/_components/dashboard/TipTapViewer';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Form from 'next/form';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog';
import { startTransition, useActionState, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { BidSchema } from '@/app/_utils/schema';
import { PlaceBidAction } from '@/app/actions';
import { toast } from 'sonner';

interface ItemFormProps {
  data: {
    id: string;
    name: string;
    image: string[];
    startingPrice: number;
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
}

export default function ItemForm({ data, bids, userID }: ItemFormProps) {
  const [warning, setWarning] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [lastResult, formAction, isPending] = useActionState(
    PlaceBidAction,
    null,
  );
  console.log(bids);
  const [form, fields] = useForm({
    lastResult,
    onSubmit: async (event, { formData }) => {
      event.preventDefault();
      const submission = parseWithZod(formData, {
        schema: BidSchema,
      });

      if (submission.status !== 'success') {
        return submission.reply();
      }

      switch (String(formData.get('intent'))) {
        case 'addToWishlist':
          if (data.userId === userID) {
            setWishlist(true);
          } else {
            toast.promise(
              fetch(`/api/wishlist/${data.id}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              }),
              {
                loading: 'Adding to Wishlist...',
                success: 'Added to Wishlist',
                error: 'Could not be Added to Wishlist',
              },
            );
          }
          return;

        case 'placeBid':
          if (data.userId === userID) {
            setWarning(true);
            return;
          } else if (bids && bids[0].user.id === userID) {
            toast.error('You are already the highest bidder');
            return;
          } else if (data.endDate < new Date()) {
            toast.error('Bidding has ended for this Item');
            return;
          }
          break;
      }
      startTransition(() => {
        formAction(formData);
      });
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
            <Form
              id={form.id}
              onSubmit={form.onSubmit}
              action={formAction}
              className="w-full"
            >
              {form.errors}
              <input
                name={fields.currentBid.name}
                defaultValue={
                  Number(data.currentBid) + Number(data.bidInterval)
                }
                readOnly
                hidden
              />
              <input
                name={fields.itemId.name}
                defaultValue={data.id}
                readOnly
                hidden
              />
              <div className="jistify-between flex items-center gap-2">
                <Button
                  variant="secondary"
                  type="submit"
                  name="intent"
                  value="addToWishlist"
                  className="hover:bg-sidebar bg-background w-full"
                >
                  <IconHeartFilled />
                  <p>Add to Wishlist</p>
                </Button>
                <Button
                  type="submit"
                  name="intent"
                  value="placeBid"
                  disabled={isPending}
                  className="size-full"
                >
                  {!isPending && <IconGavel />}
                  {isPending && (
                    <IconLoader
                      size={25}
                      strokeWidth={2.5}
                      className="animate-spin [animation-duration:3s]"
                    />
                  )}
                  <TextMorph>
                    {isPending ? 'Placing Bid...' : 'Place Bid'}
                  </TextMorph>
                </Button>
              </div>
            </Form>
          </div>
          <div className="bg-sidebar rounded-md p-4 text-xl font-medium">
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
          <div className="bg-sidebar flex items-center justify-around rounded-md p-4 text-xl font-medium">
            <div className="flex items-center gap-0.5">
              <span>Starting Bid:</span>
              &nbsp;
              <span className="text-primary font-bold">
                ₹{Number(data.startingPrice).toLocaleString('en-IN')}
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
            <div className="bg-sidebar flex flex-col justify-center gap-2 rounded-xl p-2 md:gap-4 md:p-4">
              {bids.map((bid, index) => {
                const Icon = numberIcons[index];
                return (
                  <ul
                    key={index}
                    className="bg-background relative flex justify-between gap-2 rounded-xl p-4 shadow-md transition-shadow duration-500 hover:shadow-sm max-md:flex-col"
                  >
                    <li className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icon className="text-muted-foreground/40 size-10" />
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
                      <li className="z-10 text-base md:text-lg">
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
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <span>{warning && <IconAlertSquareRoundedFilled />}</span>
                <span>{wishlist && <IconHeartbeat />}</span>
                <span>{warning && 'Action not Allowed'}</span>
                <span>{wishlist && 'Cannot be Wishlisted'}</span>
              </DialogTitle>
            </DialogHeader>
            <DialogContent>
              {warning &&
                'You cannot place a bid on an item you&apos;ve listed for bidding.'}
              {wishlist &&
                'You cannot wishlist an item you&apos;ve listed for bidding.'}
            </DialogContent>
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
