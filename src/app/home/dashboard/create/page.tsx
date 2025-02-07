'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Form from 'next/form';
import { useActionState, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ItemsSchema } from '@/lib/schema';
import { OnboardingUserAction } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CircleArrowRight, Loader, Trash2 } from 'lucide-react';
import { TextMorph } from '@/components/primitives/text-morph';
import { motion } from 'motion/react';
import { GlowEffect } from '@/components/primitives/glow-effect';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadthing';
import Image from 'next/image';

export default function ItemCreationRoute() {
  const [images, setImages] = useState<string[]>([]);

  const [lastResult, formAction, isPending] = useActionState(
    OnboardingUserAction,
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
     setImages(images.filter((_, i) => i !== index));
     toast.info('Image has been Deleted');
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
          <CardTitle className="text-2xl">Your are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
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
                      defaultValue={fields.name.initialValue}
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
                      placeholder="Pin Code "
                    />
                    <p className="-mt-2 ml-3 text-sm font-medium text-destructive">
                      {fields.price.errors}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Label>Images</Label>
                  <input
                    type="hidden"
                    value={images}
                    key={fields.image.key}
                    name={fields.image.name}
                    defaultValue={fields.image.initialValue as any}
                  />
                  {images ? (
                    <UploadDropzone
                      endpoint="imageUploader"
                      appearance={{
                        container:
                          'capitalize border-muted-foreground font-medium border-2 bg-background w-full',
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
                    <div className="mx-auto flex flex-wrap justify-center gap-5 rounded-lg bg-background p-5">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image}
                            alt="Item's Image"
                            width={200}
                            height={200}
                            className="size-24 rounded-lg border-2 border-muted-foreground bg-muted object-cover md:size-32"
                          />

                          <Button
                            className="absolute inset-x-0 inset-y-[72px] h-6 w-24 rounded-t-none border-2 border-t-0 border-muted-foreground bg-red-700 hover:bg-red-800 md:inset-y-24 md:h-8 md:w-32"
                            variant="destructive"
                            onClick={() => handleDelete(index)}
                            type="button"
                          >
                            <Trash2
                              strokeWidth={3}
                              className="mr-1 hidden size-4 md:block"
                            />
                            <p className="font-bold tracking-wide">Delete</p>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="font-mont -mt-2 ml-3 text-destructive">
                    {fields.image.errors}
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
