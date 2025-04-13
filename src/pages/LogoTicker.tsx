import { InfiniteSlider } from '@/app/_components/homePage/InfiniteSlider';
import Image from 'next/image';

export default function LogoTicker() {
  return (
    <section className="bg-black py-18 text-white md:py-24">
      <h2 className="text-center text-xs text-white/50 md:text-sm">
        Trusted by innovative teams worldwide
      </h2>
      <div className="mt-5 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:mt-8">
        <InfiniteSlider speedOnHover={25} gap={30}>
          <Image
            src="/company/acme.webp"
            alt="acme"
            width={250}
            height={250}
            loading="lazy"
            className="h-7 w-auto md:h-8"
          />
          <Image
            src="/company/apex.webp"
            alt="apex"
            width={250}
            height={250}
            loading="lazy"
            className="h-7 w-auto md:h-8"
          />
          <Image
            src="/company/celestial.webp"
            alt="celestial"
            width={250}
            height={250}
            loading="lazy"
            className="h-7 w-auto md:h-8"
          />
          <Image
            src="/company/echo.webp"
            alt="echo"
            width={250}
            height={250}
            loading="lazy"
            className="h-7 w-auto md:h-8"
          />
          <Image
            src="/company/pulse.webp"
            alt="pulse"
            width={250}
            height={250}
            loading="lazy"
            className="h-7 w-auto md:h-8"
          />
          <Image
            src="/company/quantum.webp"
            alt="quantum"
            width={250}
            height={250}
            loading="lazy"
            className="h-7 w-auto md:h-8"
          />
        </InfiniteSlider>
      </div>
    </section>
  );
}
