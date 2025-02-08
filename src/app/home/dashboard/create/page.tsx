'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Form from 'next/form';
import { useActionState, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ItemsSchema } from '@/lib/schema';
import { ItemCreationAction } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CircleArrowRight, CloudUpload, Loader, Trash2 } from 'lucide-react';
import { TextMorph } from '@/components/primitives/text-morph';
import { motion } from 'motion/react';
import { GlowEffect } from '@/components/primitives/glow-effect';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadthing';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/primitives/carousel';

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
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label>Name of the Product</Label>
                    <Input
                      type="text"
                      key={fields.name.key}
                      name={fields.name.name}
                      defaultValue={fields.name.initialValue as any}
                      className="w-full"
                      placeholder="First Name"
                    />
                    <p className="-mt-2 ml-3 text-sm font-medium text-destructive">
                      {fields.name.errors}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      key={fields.price.key}
                      name={fields.price.name}
                      defaultValue={fields.price.initialValue}
                      className="w-full"
                      placeholder="Price "
                    />
                    <p className="-mt-2 ml-3 text-sm font-medium text-destructive">
                      {fields.price.errors}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Description</Label>
                  <Input
                    type="text"
                    key={fields.description.key}
                    name={fields.description.name}
                    defaultValue={fields.description.initialValue}
                    className="w-full"
                    placeholder="Last Name"
                  />
                  <p className="-mt-2 ml-3 text-sm font-medium text-destructive">
                    {fields.description.errors}
                  </p>
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
                        'capitalize border-muted-foreground font-normal border-2 bg-background w-full',
                    }}
                    content={{
                      uploadIcon: <CloudUpload size={50} />,
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
                  <Card className="border-2 border-dashed border-muted-foreground bg-primary/10">
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
                                  className="aspect-square rounded-lg border-2 border-dotted border-muted-foreground bg-muted object-contain"
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
                                  ? 'bg-primary/20 outline-dashed outline-primary/20'
                                  : 'bg-primary/10 outline outline-border dark:outline-muted-foreground/80'
                              }`}
                            />
                            <Button
                              className="absolute bottom-0 left-0 h-5 w-full rounded-b-xl rounded-t-none bg-red-500 text-white hover:bg-red-600 md:h-7"
                              variant="destructive"
                              onClick={() => handleDelete(marker)}
                              type="button"
                            >
                              <Trash2
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
                <p className="font-mont -mt-2 ml-3 text-destructive">
                  {fields.image.errors}
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <Button
                disabled={isPending}
                variant={isPending ? 'outline' : 'default'}
                className={`${isPending && 'outline-dashed outline-2 outline-muted-foreground'} flex w-fit items-center gap-2 text-sm font-medium md:text-base`}
              >
                {isPending && (
                  <Loader
                    size={25}
                    strokeWidth={2.5}
                    className="animate-spin [animation-duration:3s]"
                  />
                )}
                <TextMorph>
                  {isPending ? 'Adding your Product...' : 'Add your Product'}
                </TextMorph>
                {!isPending && (
                  <CircleArrowRight
                    size={25}
                    strokeWidth={2.5}
                    className="mt-0.5"
                  />
                )}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
