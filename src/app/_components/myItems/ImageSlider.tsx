'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from '@/app/_components/ui/carousel';
import Image from 'next/image';
import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Carousel index={index} onIndexChange={setIndex}>
        <CarouselContent className="relative">
          {images.map((image, pointer) => (
            <CarouselItem
              key={pointer}
              className="flex items-center justify-center p-4"
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`Image ${pointer}`}
                width={1000}
                height={200}
                className="border-muted-foreground bg-muted aspect-square rounded-lg border-2 border-dashed object-cover md:size-96"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation
          alwaysShow
          className="flex justify-center gap-[25%] md:gap-[30%] lg:gap-[35%] xl:gap-[40%]"
        />
      </Carousel>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {images.map((_, marker) => (
          <div className="relative" key={marker}>
            <Image
              key={marker}
              src={images[marker] || '/placeholder.svg'}
              alt={`Image ${marker}`}
              width={200}
              height={200}
              aria-label={`Go to slide ${marker}`}
              onClick={() => setIndex(marker)}
              className={`size-16 rounded-lg object-cover outline-2 md:size-24 ${
                index === marker
                  ? 'bg-primary/20 outline-muted-foreground outline-dashed'
                  : 'bg-primary/10 outline-border dark:outline-muted-foreground/60'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
