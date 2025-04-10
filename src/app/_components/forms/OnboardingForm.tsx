'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import Form from 'next/form';
import { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { OnboardingUserSchema } from '@/app/_utils/schema';
import { OnboardingUserAction } from '@/app/actions';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { motion } from 'motion/react';
import { GlowEffect } from '@/app/_components/ui/glow-effect';
import { SubmitButton } from '@/app/_components/home/Buttons';
import { IconSend } from '@tabler/icons-react';

export default function OnboardingForm() {
  const [lastResult, formAction, isPending] = useActionState(
    OnboardingUserAction,
    null,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnboardingUserSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="relative flex h-full min-h-dvh items-center justify-center p-4 tracking-wide">
      <div className="absolute inset-0">
        <svg className="h-full w-full">
          <defs>
            <pattern
              id="grid-pattern"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M0 4H4M4 4V0M4 4H8M4 4V8"
                stroke="currentColor"
                strokeOpacity="0.3"
                className="stroke-white dark:stroke-black"
              />
              <rect
                x="3"
                y="3"
                width="2"
                height="2"
                fill="currentColor"
                fillOpacity="0.25"
                className="fill-black dark:fill-white"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
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
            <CardTitle className="text-2xl">
              Your are almost finished!
            </CardTitle>
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
              className="flex flex-col gap-4"
            >
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
                  className={fields.firstName.errors && 'border-destructive'}
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
                  className={fields.phoneNumber.errors && 'border-destructive'}
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
              <SubmitButton
                icon={<IconSend />}
                text="Start Your Journey"
                loadingText="Starting Your Journey..."
                buttonVariant="default"
                loadingVariant="ghost"
                className="w-full"
              />
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
