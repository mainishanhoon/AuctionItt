'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/app/_components/ui/sidebar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog';
import Link from 'next/link';
import { navigationLink } from '@/constants/navLinks';
import { IconGavel, IconLogout2 } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import SignOutWrapper from '@/app/_components/auth/SignOut';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="dark:border-sidebar-accent border-b">
        <div className="flex items-center gap-2 px-2">
          <IconGavel className="bg-primary size-8 rounded-md p-1 text-white" />
          <p className="text-primary text-2xl font-semibold">
            Auction<span className="text-foreground">Itt</span>
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigationLink.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-muted-foreground/60 uppercase">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {item.items.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 h-9 gap-2 rounded-md bg-gradient-to-r font-medium hover:bg-transparent [&>svg]:size-auto"
                      isActive={item.url === pathname}
                    >
                      <Link
                        href={item.url}
                        prefetch={false}
                        target={
                          item.title == 'Help Center' ? '_blank' : '_self'
                        }
                      >
                        {item.icon && (
                          <item.icon
                            className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <p>{item.title}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild className="w-full">
                <SidebarMenuButton className="dark:bg-destructive/80 bg-destructive/70 hover:bg-destructive/60 dark:hover:bg-destructive/70 h-10 w-full cursor-pointer gap-2 rounded-md font-medium [&>svg]:size-auto">
                  <IconLogout2
                    className="text-muted dark:text-red-950"
                    size={22}
                    aria-hidden="true"
                  />
                  <span className="text-muted dark:text-red-950">Sign Out</span>
                </SidebarMenuButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    You really want to Sign Out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will end your current session. You will need to
                    sign in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="mr-auto">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <SignOutWrapper className="text-muted bg-destructive hover:bg-destructive/90 flex items-center shadow-sm dark:text-red-950">
                      <IconLogout2
                        className="text-muted dark:text-red-950"
                        size={22}
                        aria-hidden="true"
                      />
                      <span>Sign Out</span>
                    </SignOutWrapper>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
