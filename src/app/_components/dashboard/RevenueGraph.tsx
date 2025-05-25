import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { prisma } from '@/app/_utils/prisma';
import { getUser } from '@/hooks/hooks';
import AreaChartGraph from '@/app/_components/dashboard/AreaChart';

async function getData() {
  const user = await getUser();

  const rawData = await prisma.item.findMany({
    where: {
      userId: user.id,
      endDate: {
        lte: new Date(),
      },
    },
    select: {
      id: true,
      endDate: true,
      currentBid: true,
    },
    orderBy: {
      endDate: 'asc',
    },
  });

  //Group and aggregate data by date
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.endDate).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      });

      acc[date] = (acc[date] || 0) + curr.currentBid;

      return acc;
    },
    {},
  );
  //Convert to array and from the object
  const transformedData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ', ' + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return transformedData;
}

export async function RevenueGraph() {
  const data = await getData();

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle className="text-xl">Revenue Graph</CardTitle>
        <CardDescription className="font-medium">
          Total amount which have been received in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChartGraph data={data} />
      </CardContent>
    </Card>
  );
}
