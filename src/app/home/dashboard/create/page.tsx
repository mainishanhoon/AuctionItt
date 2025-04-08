'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  IconLoader,
  IconTagPlus,
  IconUpload,
  IconTrash,
} from '@tabler/icons-react';

export default function ItemCreationRoute() {
  const [images, setImages] = useState<string[]>([]);
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
            <div className="grid gap-5 md:grid-cols-2 md:gap-10">
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
                      <Label>Price</Label>
                      <p className="text-destructive mr-2 -mb-1 text-xs">
                        {fields.price.errors}
                      </p>
                    </div>
                    <Input
                      type="number"
                      key={fields.price.key}
                      name={fields.price.name}
                      defaultValue={fields.price.initialValue}
                      className={fields.price.errors && 'border-destructive'}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-end justify-between">
                    <Label>Description</Label>
                    <p className="text-destructive mr-2 -mb-1 text-xs">
                      {fields.description.errors}
                    </p>
                  </div>
                  <Input
                    type="text"
                    key={fields.description.key}
                    name={fields.description.name}
                    defaultValue={fields.description.initialValue}
                    className={
                      fields.description.errors && 'border-destructive'
                    }
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Label>Images</Label>
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
                        'capitalize border-muted-foreground font-normal border-2 bg-background w-full p-5 md:p-10',
                      button:
                        'ut-ready:bg-green-500 md:text-sm text-xs ut-uploading:cursor-not-allowed cursor-pointer bg-primary px-2 md:px-3 after:bg-orange-400',
                    }}
                    content={{
                      uploadIcon: (
                        <IconUpload className="border-muted-foreground bg-muted size-20 rounded-xl border-2 border-dashed p-2 md:size-28" />
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
                  <Card className="border-muted-foreground bg-primary/10 border-2 border-dashed">
                    <div className="relative mt-2 flex w-full flex-col items-center">
                      <Carousel index={index} onIndexChange={setIndex}>
                        <CarouselContent className="relative">
                          {images.map((image, pointer) => (
                            <CarouselItem key={pointer} className="p-4">
                              <div className="relative flex justify-center">
                                <Image
                                  src={image}
                                  alt={`Image ${pointer}`}
                                  width={400}
                                  height={200}
                                  className="border-muted-foreground bg-muted aspect-square rounded-lg border-2 border-dotted object-contain"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselNavigation alwaysShow className="px-40" />
                      </Carousel>

                      <CardFooter className="mt-4 flex w-full flex-wrap justify-center gap-4">
                        {images.map((_, marker) => (
                          <div className="relative" key={marker}>
                            <Image
                              key={marker}
                              src={images[marker]}
                              alt={`Image ${marker}`}
                              width={200}
                              height={200}
                              aria-label={`Go to slide ${marker + 1}`}
                              onClick={() => setIndex(marker)}
                              className={`size-16 rounded-lg object-contain outline-2 md:size-24 ${
                                index === marker
                                  ? 'bg-primary/20 outline-primary/20 outline-dashed'
                                  : 'bg-primary/10 outline-border dark:outline-muted-foreground/80 outline'
                              }`}
                            />
                            <Button
                              className="absolute bottom-0 left-0 h-5 w-full rounded-t-none rounded-b-xl bg-red-500 text-white hover:bg-red-600 md:h-7"
                              variant="destructive"
                              onClick={() => handleDelete(marker)}
                              type="button"
                            >
                              <IconTrash
                                strokeWidth={3}
                                className="hidden size-5 md:block"
                              />
                              <p>Delete</p>
                            </Button>
                          </div>
                        ))}
                      </CardFooter>
                    </div>
                  </Card>
                )}
                <p className="font-mont text-destructive -mt-2 ml-3">
                  {fields.image.errors}
                </p>
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
