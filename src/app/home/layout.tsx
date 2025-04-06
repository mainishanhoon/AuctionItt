/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { UserHeader } from '@/app/_components/home/Header';
import { fetchUser } from '@/hooks/hooks';
import { prisma } from '@/app/_utils/prisma';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { AppSidebar } from '@/app/_components/home/Sidebar';
import { SidebarInset, SidebarProvider } from '@/app/_components/ui/sidebar';

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      pinCode: true,
    },
  });

  if (!data?.firstName || !data?.lastName || !data?.pinCode) {
    redirect('/auth/onboarding');
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await fetchUser();
  await getUser(session.user?.id!);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <UserHeader />
        <div className="min-h-[100vh] flex-1 p-2 md:min-h-min md:p-4 lg:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
