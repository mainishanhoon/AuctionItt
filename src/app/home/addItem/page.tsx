'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import Form from 'next/form';
import { useActionState, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ItemsSchema } from '@/app/_utils/schema';
import { ItemCreationAction } from '@/app/actions';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { Button } from '@/app/_components/ui/button';
import { TextMorph } from '@/app/_components/ui/text-morph';
import { motion } from 'motion/react';
import { GlowEffect } from '@/app/_components/ui/glow-effect';
import { toast } from 'sonner';
import { UploadDropzone } from '@/app/_utils/uploadthing';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from '@/app/_components/ui/carousel';
import {
  IconCalendarWeek,
  IconLoader,
  IconTagPlus,
  IconUpload,
} from '@tabler/icons-react';
import TipTapEditor from '@/app/_components/dashboard/TipTapEditor';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover';
import { Calendar } from '@/app/_components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { ItemStatus } from '@prisma/client';

export default function ItemCreationRoute() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [index, setIndex] = useState(0);
  const [lastResult, formAction, isPending] = useActionState(
    ItemCreationAction,
    null,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ItemsSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);

    setImages(updatedImages);
    setIndex(index === images.length - 1 ? index - 1 : index);

    toast.info('Image has been deleted');
  };

  return (
    <div className="relative">
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: isPending ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        <GlowEffect
          colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
          mode="colorShift"
          blur="medium"
          duration={4}
        />
      </motion.div>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="text-2xl">Showcase your Items</CardTitle>
          <CardDescription>
            Fill in the details of the item you want to put in the auction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            id={form.id}
            onSubmit={form.onSubmit}
            action={formAction}
            noValidate
          >
            <div className="grid gap-5 xl:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                      <Label>Name of the Product</Label>
                      <p className="text-destructive mr-2 -mb-1 text-xs">
                        {fields.name.errors}
                      </p>
                    </div>
                    <Input
                      type="hidden"
                      key={fields.endDate.key}
                      name={fields.endDate.name}
                      value={selectedDate.toISOString()}
                    />
                    <Input
                      type="text"
                      key={fields.name.key}
                      name={fields.name.name}
                      defaultValue={fields.name.initialValue}
                      className={fields.name.errors && 'border-destructive'}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                      <Label>Starting Price</Label>
                      <p className="text-destructive mr-2 -mb-1 text-xs">
                        {fields.startingPrice.errors}
                      </p>
                    </div>
                    <Input
                      type="number"
                      key={fields.startingPrice.key}
                      name={fields.startingPrice.name}
                      defaultValue={fields.startingPrice.initialValue}
                      className={
                        fields.startingPrice.errors && 'border-destructive'
                      }
                      placeholder="Starting Price"
                    />
                  </div>
                  <div className="col-span-2 grid gap-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-end justify-between">
                        <Label>Bid Interval</Label>
                        <p className="text-destructive mr-2 -mb-1 text-xs">
                          {fields.bidInterval.errors}
                        </p>
                      </div>
                      <Input
                        type="number"
                        key={fields.bidInterval.key}
                        name={fields.bidInterval.name}
                        defaultValue={fields.bidInterval.initialValue}
                        className={
                          fields.bidInterval.errors && 'border-destructive'
                        }
                        placeholder="Bid Interval"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Status</Label>
                      <Select
                        key={fields.status.key}
                        name={fields.status.name}
                        defaultValue={fields.status.initialValue}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ItemStatus).map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className="font-bold"
                            >
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="font-mont text-destructive -mt-2 ml-3">
                        {fields.status.errors}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-end justify-between">
                        <Label>Bid Deadline</Label>
                        <p className="text-destructive mr-2 -mb-1 text-xs">
                          {fields.endDate.errors}
                        </p>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="hover:bg-sidebar justify-start text-left"
                          >
                            <IconCalendarWeek />
                            {selectedDate ? (
                              new Intl.DateTimeFormat('en-IN', {
                                dateStyle: 'long',
                              }).format(selectedDate)
                            ) : (
                              <span>Pick a Date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="size-fit p-1">
                          <Calendar
                            selected={selectedDate}
                            onSelect={(date) =>
                              setSelectedDate(date || new Date())
                            }
                            mode="single"
                            fromDate={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                      <Label>Description</Label>
                      <p className="text-destructive mr-2 -mb-1 text-xs">
                        {fields.description.errors}
                      </p>
                    </div>
                    <Input
                      type="hidden"
                      key={fields.description.key}
                      name={fields.description.name}
                      defaultValue={fields.description.initialValue}
                    />
                    <TipTapEditor
                      field={fields.description}
                      className={
                        fields.description.errors && 'border-destructive'
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-end justify-between">
                  <Label>Images</Label>
                  <p className="text-destructive mr-2 -mb-1 text-xs">
                    {fields.image.errors}
                  </p>
                </div>
                <Input
                  type="hidden"
                  value={images}
                  key={fields.image.key}
                  name={fields.image.name}
                />
                {images.length === 0 ? (
                  <UploadDropzone
                    endpoint="imageUploader"
                    appearance={{
                      container:
                        'capitalize border-muted-foreground h-full font-normal border-2 bg-background w-full p-5 md:p-10',
                      button:
                        'md:text-sm text-xs  cursor-pointer bg-primary px-2 md:px-3 after:bg-orange-400 block',
                    }}
                    content={{
                      uploadIcon: (
                        <IconUpload
                          className={cn(
                            fields.image.errors
                              ? 'border-destructive'
                              : 'border-muted-foreground',
                            'bg-muted size-20 rounded-xl border-2 border-dashed p-2 md:size-28',
                          )}
                        />
                      ),
                      label: 'Choose files or Drag & Drop',
                    }}
                    onClientUploadComplete={(res) => {
                      setImages(res.map((r) => r.url));
                      toast.success('Image has been Uploaded');
                    }}
                    onUploadError={(error) => {
                      toast.error(error.message);
                    }}
                  />
                ) : (
                  <Card
                    className={cn(
                      fields.image.errors
                        ? 'border-destructive'
                        : 'border-muted-foreground',
                      'bg-primary/10 relative mt-2 flex flex-col items-center justify-center border-2 border-dashed',
                    )}
                  >
                    <Carousel index={index} onIndexChange={setIndex}>
                      <CarouselContent className="relative">
                        {images.map((image, pointer) => (
                          <CarouselItem
                            key={pointer}
                            className="flex items-center justify-center p-4"
                          >
                            <Image
                              src={image || '/placeholder.svg'}
                              alt={`Image ${pointer}`}
                              width={1000}
                              height={200}
                              loading="lazy"
                              draggable={false}
                              className="border-muted-foreground bg-muted aspect-square rounded-lg border-2 border-dashed object-cover md:size-96"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselNavigation
                        alwaysShow
                        className="flex justify-center gap-[25%] md:gap-[30%] lg:gap-[35%] xl:gap-[45%]"
                      />
                    </Carousel>

                    <div className="flex flex-wrap justify-center gap-3">
                      {images.map((_, marker) => (
                        <div className="relative" key={marker}>
                          <Image
                            key={marker}
                            src={images[marker] || '/placeholder.svg'}
                            alt={`Image ${marker}`}
                            width={200}
                            height={200}
                            aria-label={`Go to slide ${marker}`}
                            onClick={() => setIndex(marker)}
                            className={`size-14 rounded-lg object-cover outline-2 md:size-20 ${
                              index === marker
                                ? 'bg-primary/20 outline-muted-foreground outline-dashed'
                                : 'bg-primary/10 outline-border dark:outline-muted-foreground/60'
                            }`}
                          />
                          <p
                            className="absolute bottom-0 left-0 h-6 w-full cursor-pointer gap-0.5 rounded-t-none rounded-b-xl bg-red-500 text-center text-white hover:bg-red-600"
                            onClick={() => handleDelete(marker)}
                          >
                            Delete
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <Button
                disabled={isPending}
                variant={isPending ? 'outline' : 'default'}
                className={`${isPending && 'outline-muted-foreground outline-2 outline-dashed'} flex w-fit items-center gap-2 text-sm font-medium`}
              >
                {!isPending && <IconTagPlus />}
                {isPending && (
                  <IconLoader
                    size={25}
                    strokeWidth={2.5}
                    className="animate-spin [animation-duration:3s]"
                  />
                )}
                <TextMorph>
                  {isPending ? 'Adding your Product...' : 'Add your Product'}
                </TextMorph>
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
