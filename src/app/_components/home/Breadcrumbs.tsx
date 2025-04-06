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
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const navItem = findNavItem(href);
    const label = navItem?.title || segment;

    return {
      label,
      href,
      icon: navItem?.icon || null,
      isLast: index === pathSegments.length - 1,
    };
  });

  function findNavItem(url: string) {
    for (const section of navigationLink.navMain) {
      const match = section.items.find((item) => item.url === url);
      if (match) return match;
    }
    return null;
  }

  return (
    <Breadcrumb suppressHydrationWarning>
      <BreadcrumbList className="bg-background rounded-md border px-3 py-2 shadow-xs">
        {breadcrumbs.map((crumb, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={crumb.href} className="flex items-center gap-2">
              {!isFirst && (
                <BreadcrumbSeparator
                  className={cn(isLast && 'hidden md:block')}
                />
              )}

              <BreadcrumbItem>
                {crumb.isLast ? (
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
