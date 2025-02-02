'use client';

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

export function UserHeader() {
  return (
    <header className="bg-default-500 sticky top-0 z-50 w-full py-1 shadow-xl">
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

            <p className="font-bold tracking-wide">
              Auction
              <span className="text-primary">Itt</span>
            </p>
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

                <p className="font-bold tracking-wide">
                  Auction
                  <span className="text-primary">Itt</span>
                </p>
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

                  <p className="font-bold tracking-wide">
                    Auction
                    <span className="text-primary">Itt</span>
                  </p>
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
        <ThemeToggle />
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

            <p className="font-bold tracking-wide">
              Auction
              <span className="text-primary">Itt</span>
            </p>
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

                <p className="font-bold tracking-wide">
                  Auction
                  <span className="text-primary">Itt</span>
                </p>
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

                  <p className="font-bold tracking-wide">
                    Auction
                    <span className="text-primary">Itt</span>
                  </p>
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
            <Link href={'/signIn'}>
              <Button
                type="button"
                className="inline-flex items-center rounded-lg border"
              >
                <Magnetic
                  intensity={0.1}
                  springOptions={springOptions}
                  actionArea="global"
                  range={200}
                >
                  <span>Sign In</span>
                </Magnetic>
              </Button>
            </Link>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
