import {
  IconAddressBook,
  IconCode,
  IconDashboard,
  IconHelpSquareRounded,
  IconHome,
  IconReport,
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
          title: 'Contacts',
          url: '#',
          icon: IconAddressBook,
        },
        {
          title: 'Tools',
          url: '#',
          icon: IconCode,
        },
        {
          title: 'Reports',
          url: '#',
          icon: IconReport,
        },
      ],
    },
    {
      title: 'Other',
      url: '#',
      items: [
        {
          title: 'Settings',
          url: '#',
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
