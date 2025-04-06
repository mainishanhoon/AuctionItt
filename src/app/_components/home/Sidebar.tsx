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
import Link from 'next/link';
import { navigationLink } from '@/constants/navLinks';
import { IconGavel, IconLogout2 } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import SignOutWrapper from '../auth/SignOut';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="dark:border-sidebar-accent border-b">
        <div className="flex items-center gap-2 px-2">
          <IconGavel className="bg-primary text-foreground size-8 rounded-md p-1" />
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
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 h-9 gap-2 rounded-md bg-gradient-to-r font-medium hover:bg-transparent [&>svg]:size-auto"
                      isActive={item.url === pathname}
                    >
                      <Link href={item.url} prefetch={false}>
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
            <SignOutWrapper>
              <SidebarMenuButton className="data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 hover:bg-destructive/20 h-9 gap-3 cursor-pointer rounded-md font-medium [&>svg]:size-auto">
                <IconLogout2
                  className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                  size={22}
                  aria-hidden="true"
                />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SignOutWrapper>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
