'use client';

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart';

interface AreaChartProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function AreaChartGraph({ data }: AreaChartProps) {
  const chartConfig = {
    amount: {
      label: 'Revenue',
      color: 'var(--primary)',
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="bg-background rounded-2xl pt-4 pr-4 font-bold lg:pt-6 lg:pr-6"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Area
            type="bump"
            dataKey="amount"
            fill="var(--color-amount)"
            fillOpacity={0.4}
            stroke="var(--color-amount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
