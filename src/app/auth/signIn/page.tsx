import SocialButton from '@/app/_components/auth/SocialButton';
import { SubmitButton } from '@/app/_components/home/Buttons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { auth, signIn } from '@/app/_utils/auth';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { IconGavel, IconMail, IconMailFilled } from '@tabler/icons-react';

export default async function AuthDialogBox() {
  const session = await auth();

  if (session?.user) {
    return redirect('/home');
  }

  return (
    <section className="flex min-h-dvh h-full items-center justify-center p-4 md:p-0">
      <div className="absolute inset-0">
        <svg className="size-full">
          <defs>
            <pattern
              id="grid-pattern"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M0 4H4M4 4V0M4 4H8M4 4V8"
                stroke="currentColor"
                strokeOpacity="0.3"
                className="stroke-black dark:stroke-white"
              />
              <rect
                x="18"
                y="18"
                width="1"
                height="1"
                fill="currentColor"
                fillOpacity="0.25"
                className="stroke-black dark:stroke-white"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-4xl font-black">
            <IconGavel className="bg-primary text-white size-10 rounded-lg p-1" />
            <p className="text-primary font-semibold tracking-normal">
              Auction<span className="text-foreground">Itt</span>
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-xl font-medium md:text-3xl">
          <span className="bg-primary/20 rounded-xl px-2 py-1">Please</span>
          &nbsp;Sign In to Continue
          <Form
            action={async (formData) => {
              'use server';
              await signIn('resend', formData);
            }}
            className="mt-6 flex flex-col gap-5"
          >
            <div className="flex flex-col items-start gap-2 md:gap-3">
              <Label htmlFor="email">Email</Label>
              <div className="relative w-full">
                <Input type="email" name="email" placeholder="Email" />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                  <IconMailFilled size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <SubmitButton
                icon={<IconMail />}
                text="Sign In with Email"
                loadingText="Signing In with Email..."
                buttonVariant="default"
                loadingVariant="outline"
              />
            </div>
          </Form>
          <div className="before:bg-muted-foreground after:bg-muted-foreground mt-5 flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
            <span className="text-muted-foreground text-xs">OR</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <SocialButton />
        </CardFooter>
      </Card>
    </section>
  );
}
