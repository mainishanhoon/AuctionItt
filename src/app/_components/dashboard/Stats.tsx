import {
  IconCoinRupee,
  IconPentagram,
  IconTopologyStarRing3,
  IconUserSquareRounded,
} from '@tabler/icons-react';
import { StatsGrid } from '@/app/_components/home/StatsGrid';

export default function Stats() {
  return (
    <StatsGrid
      stats={[
        {
          title: 'Connections',
          value: '427,296',
          change: {
            value: '+12%',
            trend: 'up',
          },
          icon: <IconTopologyStarRing3 />,
        },
        {
          title: 'Contacts',
          value: '37,429',
          change: {
            value: '+42%',
            trend: 'up',
          },
          icon: <IconUserSquareRounded />,
        },
        {
          title: 'Value',
          value: '$82,439',
          change: {
            value: '+37%',
            trend: 'up',
          },
          icon: <IconCoinRupee />,
        },
        {
          title: 'Referrals',
          value: '3,497',
          change: {
            value: '-17%',
            trend: 'down',
          },
          icon: <IconPentagram />,
        },
      ]}
    />
  );
}
