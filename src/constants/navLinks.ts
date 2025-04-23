import {
  IconClipboardList,
  IconClock,
  IconDashboard,
  IconHelpSquareRounded,
  IconHome,
  IconLibraryPlus,
  IconSettings,
} from '@tabler/icons-react';

export const navigationLink = {
  navMain: [
    {
      title: 'Sections',
      url: '#',
      items: [
        {
          title: 'Home',
          url: '/home',
          icon: IconHome,
        },
        {
          title: 'Dashboard',
          url: '/home/dashboard',
          icon: IconDashboard,
        },
        {
          title: 'My Items',
          url: '/home/myItems',
          icon: IconClipboardList,
        },
        {
          title: 'Past Items',
          url: '/home/pastItems',
          icon: IconClock,
        },
        {
          title: 'Add Item',
          url: '/home/addItem',
          icon: IconLibraryPlus,
        },
      ],
    },
    {
      title: 'Other',
      url: '#',
      items: [
        {
          title: 'Settings',
          url: '/home/settings',
          icon: IconSettings,
        },
        {
          title: 'Help Center',
          url: '#',
          icon: IconHelpSquareRounded,
        },
      ],
    },
  ],
};
export const heroNavigationLink = [
  {
    name: 'Home',
    href: 'Hero',
  },
  {
    name: 'Features',
    href: 'Features',
  },
  {
    name: 'Testimonials',
    href: 'Testimonials',
  },
];
