import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/primitives/carousel';
import { BadgeIndianRupee, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface ProductProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
  };
}

export function ProductCard({ item }: ProductProps) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <Carousel className="overflow-hidden rounded-3xl border-2 border-dashed border-muted-foreground p-1">
          <CarouselContent>
            {item.image.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src={item}
                  alt="Product Image"
                  width={500}
                  height={500}
                  loading="lazy"
                  className="size rounded-3xl object-cover object-center sm:size-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation alwaysShow className="px-16" />
        </Carousel>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-primary">{item.name}</h1>
          <h3 className="inline-flex items-center rounded-md bg-primary/20 px-2 py-1 text-xs font-bold tracking-wider text-primary ring-1 ring-inset ring-primary/10">
            ₹{item.price}
          </h3>
        </div>
        <p className="text-xs tracking-wide text-muted-foreground">
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-5">
        <Button
          asChild
          variant="ghost"
          className="w-full bg-muted-foreground/20 hover:bg-muted-foreground/10"
        >
          <Link href={`/product/${item.id}`}>
            <ShoppingCart strokeWidth={2.5} />
            <p>Add to Cart</p>
          </Link>
        </Button>
        <Button asChild className="w-full">
          <Link href={`/dashboard/${item.id}`}>
            <BadgeIndianRupee strokeWidth={2.5} />
            <p>Purchase</p>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
