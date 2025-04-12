/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/app/_components/ui/breadcrumb';
import { navigationLink } from '@/constants/navLinks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Breadcrumbs() {
  const pathname = usePathname();
  // @ts-expect-error it is alright
  const pathSegments = pathname.split('/').filter(Boolean);

  // Helper to find nav item based on URL
  function findNavItem(url: string) {
    for (const section of navigationLink.navMain) {
      const match = section.items.find((item) => item.url === url);
      if (match) return match;
    }
    return null;
  }

  // Build breadcrumbs by checking if each subpath exactly matches a nav item
  const breadcrumbs = pathSegments.reduce(
    (acc, segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const navItem = findNavItem(href);
      if (navItem) {
        acc.push({
          label: navItem.title,
          href,
          icon: navItem.icon || null,
          isLast: false, // we'll set this properly later
        });
      }
      return acc;
    },
    [] as { label: string; href: string; icon: any; isLast: boolean }[],
  );

  // Mark last breadcrumb as final
  if (breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].isLast = true;
  }

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb suppressHydrationWarning>
      <BreadcrumbList className="bg-background rounded-md border px-3 py-2 shadow-xs">
        {breadcrumbs.map((crumb, index) => {
          const isFirst = index === 0;
          const isLast = crumb.isLast;

          return (
            <div key={crumb.href} className="flex items-center gap-2">
              {!isFirst && (
                <BreadcrumbSeparator
                  className={cn(isLast && 'hidden md:block', 'block')}
                />
              )}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1 capitalize">
                    {crumb.icon && <crumb.icon size={18} aria-hidden="true" />}
                    <span className="hidden font-medium md:block">
                      {crumb.label}
                    </span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="flex items-center gap-1 capitalize"
                  >
                    <Link href={crumb.href}>
                      {crumb.icon && (
                        <crumb.icon size={18} aria-hidden="true" />
                      )}
                      <span className="hidden font-medium md:block">
                        {crumb.label}
                      </span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
