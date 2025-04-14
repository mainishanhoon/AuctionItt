import { testimonialsData } from '@/constants/testimonials';
import Image from 'next/image';
import Card from '@/app/_components/homePage/Card';
import { InfiniteSlider } from '@/app/_components/homePage/InfiniteSlider';

export default function TestimonialsSection() {
  return (
    <section id="Testimonials" className="bg-black text-white py-16 lg:py-24">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          What our customers say
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-xl text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse iusto
          doloribus amet! Vero error qui eveniet, fuga maiores quo inventore
          ullam, deserunt
        </p>
        <div className="mt-5 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:mt-8">
          <InfiniteSlider speedOnHover={25} gap={30} className="py-5">
            {testimonialsData.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="max-w-xs p-6 transition duration-300 hover:scale-105 md:max-w-md md:p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="inline-flex size-14 flex-shrink-0 items-center rounded-full bg-gray-700">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={200}
                      height={300}
                      className="max-h-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-white/60">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/85 md:mt-6 md:text-base">
                  {testimonial.text}
                </p>
              </Card>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
