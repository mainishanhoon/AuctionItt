import { HeroNavBar } from '@/app/_components/home/NavigationBar';
import ThemeToggle from '@/app/_components/home/ThemeSwitcher';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/app/_components/ui/sheet';
import UserDropdown from '@/app/_components/auth/UserDropdown';
import { Button } from '@/app/_components/ui/button';
import { IconGavel, IconLogin2 } from '@tabler/icons-react';

import { Separator } from '@/app/_components/ui/separator';
import { SidebarTrigger } from '@/app/_components/ui/sidebar';
import Breadcrumbs from '@/app/_components/home/Breadcrumbs';

export function UserHeader() {

  return (
    <header className="bg-sidebar outline-border flex h-12 w-full items-center justify-between gap-2 outline-1">
      <div className="flex flex-1 items-center gap-2 px-2 md:px-4 lg:px-6">
        <SidebarTrigger className="md:-ml-2" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumbs />
      </div>
      <div className="flex gap-2 px-2 md:gap-3 md:px-4 lg:px-6">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  );
}

export function HeroHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 px-3 py-1.5 sm:px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black max-md:hidden"
          >
            <IconGavel className="bg-primary size-8 rounded-lg p-1 text-white" />
            <p className="text-primary font-semibold">
              Auction<span className="text-foreground">Itt</span>
            </p>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex cursor-pointer items-center space-x-2 md:hidden">
                <IconGavel className="bg-primary size-8 rounded-lg p-1 text-white" />
                <p className="text-primary font-semibold">
                  Auction<span className="text-foreground">Itt</span>
                </p>
              </div>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>
                <Link
                  href="/"
                  className="mt-5 flex items-center justify-center gap-2 text-2xl font-black"
                >
                  <IconGavel className="bg-primary size-8 rounded-lg p-1 text-white" />
                  <p className="text-primary font-semibold">
                    Auction<span className="text-foreground">Itt</span>
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
          <Link href="/auth/signIn">
            <Button className="flex items-center gap-1 px-2 md:gap-2 md:px-3">
              <IconLogin2 strokeWidth={2.5} />
              <p>SignIn</p>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
