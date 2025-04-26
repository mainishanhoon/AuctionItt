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
import { UserSchema } from '@/app/_utils/schema';
import { ProfileUpdationAction } from '@/app/actions';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { Button } from '@/app/_components/ui/button';
import { TextMorph } from '@/app/_components/ui/text-morph';
import { motion } from 'motion/react';
import { GlowEffect } from '@/app/_components/ui/glow-effect';
import Image from 'next/image';
import {
  IconLoader,
  IconTagPlus,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { UploadDropzone } from '@/app/_utils/uploadthing';
import { toast } from 'sonner';

interface ProfileUpdationProps {
  data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    pinCode: number;
    image: string;
    email: string;
  };
}

export default function ProfileUpdationRoute({ data }: ProfileUpdationProps) {
  const [image, setImage] = useState(data.image);
  const [lastResult, formAction, isPending] = useActionState(
    ProfileUpdationAction,
    null,
  );

  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      pinCode: data.pinCode,
      email: data.email,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UserSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

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
          <CardTitle className="text-2xl">Update Your Profile</CardTitle>
          <CardDescription>
            Keep your personal information up to date to ensure smooth
            communication and personalized experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            id={form.id}
            onSubmit={form.onSubmit}
            action={formAction}
            noValidate
          >
            <div className="mt-5 flex flex-col">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end justify-between">
                    <Label>Image</Label>
                    <p className="text-destructive mr-2 -mb-1 text-xs">
                      {fields.image.errors}
                    </p>
                  </div>
                  <Input
                    type="hidden"
                    key={fields.image.key}
                    name={fields.image.name}
                    value={image}
                    placeholder="Pin Code"
                  />
                  {image == '' ? (
                    <UploadDropzone
                      endpoint="avatarUploader"
                      appearance={{
                        container:
                          'capitalize border-muted-foreground font-normal border-2 bg-background size-60',
                        button:
                          'md:text-sm text-xs cursor-pointer bg-primary after:bg-orange-400 block',
                      }}
                      content={{
                        uploadIcon: (
                          <IconUpload
                            className={cn(
                              fields.image.errors
                                ? 'border-destructive'
                                : 'border-muted-foreground',
                              'bg-muted size-20 rounded-xl border-2 border-dashed p-2',
                            )}
                          />
                        ),
                        label: 'Choose file or Drag & Drop',
                      }}
                      onClientUploadComplete={(images) => {
                        setImage(images[0].url);
                        toast.success('Image has been Uploaded');
                      }}
                      onUploadError={(error) => {
                        toast.error(error.message);
                      }}
                    />
                  ) : (
                    <div className="relative">
                      <Image
                        src={
                          String(image) ||
                          `https://avatar.vercel.sh/rauchg.svg?text=${data.firstName?.charAt(0)}${data.lastName?.charAt(0)}`
                        }
                        alt="Profile Picture"
                        width={1000}
                        height={1000}
                        draggable={false}
                        loading="lazy"
                        className={cn(
                          fields.image.errors
                            ? 'border-destructive'
                            : 'border-muted-foreground',
                          'size-25 rounded-lg border border-dashed md:size-60',
                        )}
                      />
                      <p
                        className="absolute bottom-0 left-0 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-0.5 rounded-t-none rounded-b-xl bg-red-500 text-xl font-medium text-white hover:bg-red-600"
                        onClick={() => {
                          setImage('');
                        }}
                      >
                        <IconTrash />
                        <span>Remove</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                      <Label>First Name</Label>
                      <p className="text-destructive mr-2 -mb-1 text-xs">
                        {fields.firstName.errors}
                      </p>
                    </div>
                    <Input
                      type="text"
                      key={fields.firstName.key}
                      name={fields.firstName.name}
                      defaultValue={fields.firstName.initialValue}
                      placeholder="First Name"
                      className={
                        fields.firstName.errors && 'border-destructive'
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                      <Label>Last Name</Label>
                      <p className="text-destructive mr-2 -mb-1 text-xs">
                        {fields.lastName.errors}
                      </p>
                    </div>
                    <Input
                      type="text"
                      key={fields.lastName.key}
                      name={fields.lastName.name}
                      defaultValue={fields.lastName.initialValue}
                      placeholder="Last Name"
                      className={fields.lastName.errors && 'border-destructive'}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Phone Number</Label>
                    <Input
                      type="number"
                      key={fields.phoneNumber.key}
                      name={fields.phoneNumber.name}
                      defaultValue={fields.phoneNumber.initialValue}
                      placeholder="Phone Number"
                      className={
                        fields.phoneNumber.errors && 'border-destructive'
                      }
                    />
                    <p className="text-destructive -mt-1 ml-2 text-xs">
                      {fields.phoneNumber.errors}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Pin Code</Label>
                    <Input
                      type="number"
                      key={fields.pinCode.key}
                      name={fields.pinCode.name}
                      defaultValue={fields.pinCode.initialValue}
                      placeholder="Pin Code"
                      className={fields.pinCode.errors && 'border-destructive'}
                    />
                    <p className="text-destructive -mt-1 ml-2 text-xs">
                      {fields.pinCode.errors}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      key={fields.email.key}
                      name={fields.email.name}
                      defaultValue={fields.email.initialValue}
                      placeholder="Pin Code"
                      className={fields.email.errors && 'border-destructive'}
                    />
                    <p className="text-destructive -mt-1 ml-2 text-xs">
                      {fields.email.errors}
                    </p>
                  </div>
                </div>
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
                  {isPending ? 'Saving Changes...' : 'Save Changes'}
                </TextMorph>
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
