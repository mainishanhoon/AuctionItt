import SocialButton from '@/app/_components/auth/SocialButton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { auth } from '@/app/_utils/auth';
import { redirect } from 'next/navigation';
import { IconGavel } from '@tabler/icons-react';

export default async function AuthDialogBox() {
  const session = await auth();

  if (session?.user) {
    return redirect('/home');
  }

  return (
    <section className="flex h-full min-h-dvh items-center justify-center p-4 md:p-0">
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
      <Card className="relative flex flex-col gap-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-4xl font-black">
            <IconGavel className="bg-primary size-10 rounded-lg p-1 text-white" />
            <p className="text-primary font-semibold tracking-normal">
              Auction<span className="text-foreground">Itt</span>
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-xl font-medium md:text-3xl">
          <span className="bg-primary/20 rounded-xl px-2 py-1">Please</span>
          &nbsp;<span>Sign In to Continue</span>
        </CardContent>
        <CardFooter className="mt-5 flex flex-col gap-2">
          <SocialButton />
        </CardFooter>
      </Card>
    </section>
  );
}
