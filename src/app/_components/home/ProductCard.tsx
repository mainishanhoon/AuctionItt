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
import { IconReceiptRupee, IconShoppingCartFilled } from '@tabler/icons-react';

interface ProductProps {
  item: {
    id: string;
    name: string;
    description: string;
    startingPrice: number;
    image: string[];
  };
}

export function ProductCard({ item }: ProductProps) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <Carousel className="border-muted-foreground overflow-hidden rounded-3xl border-2 border-dashed p-1">
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
          <h1 className="text-primary text-xl font-medium">{item.name}</h1>
          <h3 className="bg-primary/20 text-primary ring-primary/10 inline-flex items-center rounded-md px-2 py-1 text-xs font-bold tracking-wider ring-1 ring-inset">
            ₹{item.startingPrice}
          </h3>
        </div>
        <p className="text-muted-foreground text-xs tracking-wide">
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-5">
        <Button
          asChild
          variant="ghost"
          className="bg-muted-foreground/20 hover:bg-muted-foreground/10 w-full"
        >
          <Link href={`/product/${item.id}`}>
            <IconShoppingCartFilled strokeWidth={2.5} />
            <p>Add to Cart</p>
          </Link>
        </Button>
        <Button asChild className="w-full">
          <Link href={`/dashboard/${item.id}`}>
            <IconReceiptRupee strokeWidth={2.5} />
            <p>Purchase</p>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
