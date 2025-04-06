import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
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

export default async function UserDropdown() {
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-8 rounded-md">
            <AvatarImage
              src={user.image as string}
              width={35}
              height={35}
              alt="Profile image"
            />
            <AvatarFallback>
              <Image
                src={`https://avatar.vercel.sh/rauchg.svg?text=${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`}
                width={35}
                height={35}
                alt="Profile image"
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <p className="text-foreground truncate text-sm font-medium capitalize">
            {user.fullName}
          </p>
          <p className="text-muted-foreground truncate text-xs font-normal lowercase">
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconSettingsFilled
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Settings</span>
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
        <DropdownMenuItem variant="destructive">
          <IconLogout2 size={16} className="opacity-60" aria-hidden="true" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
