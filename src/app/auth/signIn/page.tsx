import SocialButton from '@/components/auth/SocialButton';
import { Spotlight } from '@/components/primitives/spotlight';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function AuthDialogBox() {
  const session = await auth();

  if (session?.user) {
    return redirect('/dashboard');
  }

  return (
    <section className="flex items-center justify-center p-4 tracking-wide md:h-dvh md:p-0">
      <div className="absolute inset-0">
        <svg className="h-full w-full">
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
      <div className="relative overflow-hidden rounded-xl p-1">
        <Spotlight
          className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
          size={124}
        />
        <Card className="relative">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-4xl font-black">
              <Image
                alt="Logo"
                src="/logo.png"
                width={250}
                height={250}
                className="size-20"
              />
              <p className="font-bold tracking-wide">
                Auction
                <span className="text-primary">Itt</span>
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-xl font-medium md:text-3xl">
            <span className="rounded-xl bg-primary/10 px-3 py-1">Please</span>
            &nbsp;Sign in to continue
          </CardContent>
          <CardFooter className="flex w-full flex-col items-center gap-3">
            <SocialButton />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
