import ThemeToggle from '@/app/_components/home/ThemeSwitcher';
import UserDropdown from '@/app/_components/auth/UserDropdown';
import { Separator } from '@/app/_components/ui/separator';
import { SidebarTrigger } from '@/app/_components/ui/sidebar';
import Breadcrumbs from '@/app/_components/home/Breadcrumbs';
import WishlistDrawer from '@/app/_components/home/Wishlist';

export default function UserHeader() {
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
        <WishlistDrawer />
        <UserDropdown />
      </div>
    </header>
  );
}
