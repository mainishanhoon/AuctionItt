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
import { OnboardingUserSchema } from '@/lib/schema';
import { OnboardingUserAction } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Loader } from 'lucide-react';
import { motion } from 'motion/react';
import { TextMorph } from '@/components/primitives/text-morph';
import { GlowEffect } from '@/components/primitives/glow-effect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities } from '@/constants/cities';
import { states } from '@/constants/states';
import { Spotlight } from '@/components/primitives/spotlight';

export default function OnboardingRoute() {
  const [lastResult, formAction, isPending] = useActionState(
    OnboardingUserAction,
    null,
  );

  const [selectedState, setSelectedState] = useState<string>();
  const [filteredCities, setFilteredCities] = useState<
    { city: string; state: string }[]
  >([]);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnboardingUserSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  function handleStateChange(state: string) {
    setSelectedState(state);
    const filtered = cities.filter((city) => city.state === state);
    setFilteredCities(filtered);
  }

  return (
    <div className="relative flex items-center justify-center p-4 tracking-wide md:h-dvh md:p-0">
      <Spotlight
        className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
        size={250}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
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
            >
              <div className="flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2 md:gap-2">
                  <div className="flex flex-col gap-2">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      key={fields.firstName.key}
                      name={fields.firstName.name}
                      defaultValue={fields.firstName.initialValue}
                      className="w-full"
                      placeholder="First Name"
                    />
                    <p className="font-mont -mt-2 ml-3 text-destructive">
                      {fields.firstName.errors}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      key={fields.lastName.key}
                      name={fields.lastName.name}
                      defaultValue={fields.lastName.initialValue}
                      className="w-full"
                      placeholder="Last Name"
                    />
                    <p className="font-mont -mt-2 ml-3 text-destructive">
                      {fields.lastName.errors}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-2">
                  <div className="flex flex-col gap-2">
                    <Label>State</Label>
                    <Select
                      key={fields.state.key}
                      name={fields.state.name}
                      defaultValue={fields.state.initialValue}
                      value={selectedState}
                      onValueChange={(value) => handleStateChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state, index) => (
                          <SelectItem key={index} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="font-mont -mt-2 ml-3 text-destructive">
                      {fields.state.errors}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>City</Label>
                    <Select
                      key={fields.city.key}
                      name={fields.city.name}
                      defaultValue={fields.city.initialValue}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCities.length > 0 ? (
                          filteredCities.map((label, index) => (
                            <SelectItem key={index} value={label.city}>
                              {label.city}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="Space" disabled>
                            No State Selected
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <p className="font-mont -mt-2 ml-3 text-destructive">
                      {fields.city.errors}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Pin Code</Label>
                  <Input
                    type="number"
                    key={fields.pinCode.key}
                    name={fields.pinCode.name}
                    defaultValue={fields.pinCode.initialValue}
                    className="w-full"
                    placeholder="Pin Code "
                  />
                  <p className="font-mont -mt-2 ml-3 text-destructive">
                    {fields.pinCode.errors}
                  </p>
                </div>
                <Button
                  size="sm"
                  disabled={isPending}
                  variant={isPending ? 'outline' : 'default'}
                  type="submit"
                  className={`${isPending && 'outline-dashed outline-2 outline-muted-foreground'} flex items-center gap-2 text-sm font-medium md:text-base`}
                >
                  {isPending && (
                    <Loader
                      size={25}
                      strokeWidth={2.5}
                      className="animate-spin [animation-duration:3s]"
                    />
                  )}
                  <TextMorph>
                    {isPending
                      ? 'Starting Your Journey...'
                      : 'Start Your Journey'}
                  </TextMorph>
                  {!isPending && (
                    <ChevronsRight
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
    </div>
  );
}
