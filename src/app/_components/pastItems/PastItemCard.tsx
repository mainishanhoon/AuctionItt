import { Button } from '@/app/_components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from '@/app/_components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/app/_components/ui/card';
import { IconFileDescription } from '@tabler/icons-react';

interface PastItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    startingBid: number;
    image: string[];
  };
}

export default function PastItemCard({ item }: PastItemProps) {
  return (
    <Card>
      <CardHeader>
        <Carousel className="border-muted-foreground overflow-hidden rounded-xl border-2 border-dashed p-1">
          <CarouselContent>
            {item.image.map((item, index) => (
              <CarouselItem key={index} className="aspect-square rounded-sm">
                <Image
                  src={item}
                  alt="Product Image"
                  width={500}
                  height={500}
                  draggable={false}
                  loading="lazy"
                  className="size rounded-sm object-cover object-center sm:size-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation alwaysShow className="px-16 lg:px-12" />
        </Carousel>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <h1 className="text-primary truncate text-xl font-medium capitalize">
            {String(item.name)}
          </h1>
          <h3 className="bg-primary/20 text-primary ring-primary/10 inline-flex items-center rounded-md px-2 py-1 text-xs font-bold tracking-wider ring-1 ring-inset">
            ₹{Number(item.startingBid).toLocaleString()}
          </h3>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant="ghost"
          className="bg-muted-foreground/20 hover:bg-muted-foreground/10 w-full"
        >
          <Link href={`/home/item/${item.id}`}>
            <IconFileDescription />
            <p>Show Details</p>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
