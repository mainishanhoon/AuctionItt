'use client';

import { Button } from '@/app/_components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ImageSliderProps {
  images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  return (
    <div className="grid gap-6 md:gap-3">
      <div className="relative overflow-hidden rounded-3xl border-4">
        <Image
          width={600}
          height={600}
          src={images[mainImageIndex]}
          alt="Product image"
          className="aspect-square size-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            onClick={handlePreviousClick}
            variant="secondary"
            size="icon"
            className="rounded-full bg-muted transition-transform duration-300 ease-in-out hover:scale-125"
          >
            <ChevronLeftCircle strokeWidth={2.5} size={40} />
          </Button>
          <Button
            onClick={handleNextClick}
            variant="secondary"
            size="icon"
            className="rounded-full bg-muted transition-transform duration-300 ease-in-out hover:scale-125"
          >
            <ChevronRightCircle strokeWidth={2.5} size={40} />
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-4">
        {images.map((image, index) => (
          <div
            className={cn(
              index === mainImageIndex
                ? 'border-2 border-primary'
                : 'border-2 bg-muted',
              'relative cursor-pointer overflow-hidden rounded-2xl',
            )}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt="Product Image"
              width={500}
              height={500}
              loading="lazy"
              className="aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
