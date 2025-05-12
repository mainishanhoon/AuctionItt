import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { getUser } from '@/hooks/hooks';
import {
  IconAlertSquareRoundedFilled,
  IconLogout2,
  IconSettingsFilled,
} from '@tabler/icons-react';
import Image from 'next/image';
import SignOutWrapper from '@/app/_components/auth/SignOut';
import Link from 'next/link';

export default async function UserDropdown() {
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="bg-background size-8 rounded-sm border p-0.5">
            <Image
              src={user.image as string}
              width={35}
              height={35}
              alt="Profile image"
              className="rounded-sm"
            />
            <AvatarFallback>
              <Image
                src={`https://avatar.vercel.sh/rauchg.svg?text=${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`}
                width={35}
                height={35}
                alt="Profile image"
                className="rounded-sm"
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <p className="text-foreground truncate text-sm font-medium capitalize">
            {user.name}
          </p>
          <p className="text-muted-foreground truncate text-xs font-normal lowercase">
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/home/settings">
              <IconSettingsFilled
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconAlertSquareRoundedFilled
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Help Center</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutWrapper>
          <DropdownMenuItem variant="destructive">
            <IconLogout2 size={16} className="opacity-60" aria-hidden="true" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </SignOutWrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
