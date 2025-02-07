import { HeroNavBar, UserNavBar } from '@/components/NavigationBar';
import ThemeToggle from '@/components/ThemeSwitcher';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserDropdown from '@/components/auth/UserDetail';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/primitives/magnetic';
import { GlowEffect } from '@/components/primitives/glow-effect';
import { TextShimmerWave } from '@/components/primitives/text-shimmer-wave';
import { TextScramble } from '@/components/primitives/text-scramble';
import { LogIn } from 'lucide-react';
import { TextEffect } from './primitives/text-effect';

export function UserHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 px-3 py-1.5 sm:px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-semibold max-md:hidden"
          >
            <Image
              alt="Logo"
              src="/logo.png"
              width={100}
              height={100}
              className="size-10"
            />
            <TextEffect per="char" preset="fade">
              AuctionItt
            </TextEffect>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex cursor-pointer items-center space-x-2 md:hidden">
                <Image
                  alt="Logo"
                  src="/logo.png"
                  width={100}
                  height={100}
                  className="size-10"
                />

                <p className="font-bold">AuctionItt</p>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-70 flex flex-col">
              <SheetTitle>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-2xl font-black max-md:hidden"
                >
                  <Image
                    alt="Logo"
                    src="/logo.png"
                    width={100}
                    height={100}
                    className="size-10"
                  />

                  <p className="font-semibold">AuctionItt</p>
                </Link>
              </SheetTitle>
              <nav className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
                <UserNavBar />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="flex">
          <UserNavBar />
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}

export function HeroHeader() {
  const springOptions = { bounce: 0.1 };
  return (
    <header className="sticky top-0 z-50 border-b-2 px-3 py-1.5 sm:px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black max-md:hidden"
          >
            <Image
              alt="Logo"
              src="/logo.png"
              width={100}
              height={100}
              className="size-10"
            />
            <TextScramble className="font-bold">AuctionItt</TextScramble>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex cursor-pointer items-center space-x-2 md:hidden">
                <Image
                  alt="Logo"
                  src="/logo.png"
                  width={100}
                  height={100}
                  className="size-10"
                />

                <p className="font-semibold">AuctionItt</p>
              </div>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>
                <Link
                  href="/"
                  className="mt-5 flex items-center justify-center gap-2 text-2xl font-black"
                >
                  <Image
                    alt="Logo"
                    src="/logo.png"
                    width={100}
                    height={100}
                    className="size-10"
                  />

                  <p className="font-semibold">AuctionItt</p>
                </Link>
              </SheetTitle>
              <nav className="mt-5 flex flex-col items-center gap-4 md:flex-row">
                <HeroNavBar />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <HeroNavBar />
        </nav>
        <div className="flex items-center space-x-2 sm:space-x-5">
          <ThemeToggle />
          <Magnetic
            intensity={0.2}
            springOptions={springOptions}
            actionArea="global"
            range={200}
          >
            <Link href={'/auth/signIn'} className="relative hidden md:block">
              <GlowEffect
                colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
                mode="colorShift"
                blur="medium"
                duration={4}
              />
              <Button
                type="button"
                className="relative inline-flex items-center rounded-lg border"
              >
                <Magnetic
                  intensity={0.1}
                  springOptions={springOptions}
                  actionArea="global"
                  range={200}
                >
                  <p className="flex items-center gap-2">
                    <LogIn strokeWidth={3} />
                    <span>Sign In</span>
                  </p>
                </Magnetic>
              </Button>
            </Link>
          </Magnetic>
          <Link href={'/auth/signIn'} className="relative block md:hidden">
            <GlowEffect
              colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
              mode="colorShift"
              blur="medium"
              duration={4}
            />
            <Button
              type="button"
              className="relative inline-flex items-center rounded-lg border"
            >
              <span>Sign In</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
