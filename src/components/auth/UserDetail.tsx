import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fetchUser } from '@/hooks/hooks';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { LogOut, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SignOutWrapper from '@/components/auth/SignOut';

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      state: true,
      city: true,
      pinCode: true,
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

export default async function UserDropdown() {
  const session = await fetchUser();
  const data = await getUser(session?.user?.id as string);

  return (
    <div className="flex items-center gap-2">
      <Label className="hidden flex-col justify-end text-sm md:flex">
        <div className="flex gap-1">
          <p>{data.firstName}</p>
          <p>{data.lastName}</p>
        </div>
        <div className="flex items-center justify-end gap-1">
          <MapPin size={16} strokeWidth={2.5} />
          <p className="font-xs">{data.city}</p>
        </div>
      </Label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={
              (session?.user?.image as string) ||
              `https://avatar.vercel.sh/rauchg.svg?text=${data.firstName?.charAt(0)}${data.lastName?.charAt(0)}}`
            }
            alt="Profile Image"
            width={75}
            height={75}
            className="size-10 cursor-pointer rounded-lg object-contain"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-center">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SignOutWrapper>
            <Button className="w-full">
              <LogOut strokeWidth={3} />
              <p>SignOut</p>
            </Button>
          </SignOutWrapper>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
