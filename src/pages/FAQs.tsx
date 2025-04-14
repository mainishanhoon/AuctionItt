import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/app/_components/homePage/Accordion';
import { Separator } from '@/app/_components/ui/separator';
import { IconMinus } from '@tabler/icons-react';

export default function FAQs() {
  return (
    <section
      id="Features"
      className="bg-gradient-to-t from-black to-emerald-500 py-18 text-white md:py-24"
    >
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-xl text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse iusto
          doloribus amet! Vero error qui eveniet, fuga maiores quo inventore
        </p>
        <div className="mx-auto mt-10 max-w-sm md:max-w-3xl">
          <Accordion
            className="flex w-full flex-col"
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            variants={{
              expanded: {
                opacity: 1,
                scale: 1,
              },
              collapsed: {
                opacity: 0,
                scale: 0.7,
              },
            }}
          >
            <AccordionItem value="getting-started" className="py-2">
              <AccordionTrigger className="w-full py-0.5 text-left">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    How do I start with Motion-Primitives?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  Kick off your experience by setting up Motion-Primitives. This
                  section covers the basics of installation and how to add
                  animations to your projects. You&apos;ll get familiar with the
                  initial setup and the core features quickly.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="bg-muted-foreground dark my-1 h-px" />
          <Accordion
            className="flex w-full flex-col"
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            variants={{
              expanded: {
                opacity: 1,
                scale: 1,
              },
              collapsed: {
                opacity: 0,
                scale: 0.7,
              },
            }}
          >
            <AccordionItem value="getting-started" className="py-2">
              <AccordionTrigger className="w-full py-0.5 text-left">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    How do I start with Motion-Primitives?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  Kick off your experience by setting up Motion-Primitives. This
                  section covers the basics of installation and how to add
                  animations to your projects. You&apos;ll get familiar with the
                  initial setup and the core features quickly.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="bg-muted-foreground my-1 h-px" />
          <Accordion
            className="flex w-full flex-col"
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            variants={{
              expanded: {
                opacity: 1,
                scale: 1,
              },
              collapsed: {
                opacity: 0,
                scale: 0.7,
              },
            }}
          >
            <AccordionItem value="getting-started" className="py-2">
              <AccordionTrigger className="w-full py-0.5 text-left">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    How do I start with Motion-Primitives?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  Kick off your experience by setting up Motion-Primitives. This
                  section covers the basics of installation and how to add
                  animations to your projects. You&apos;ll get familiar with the
                  initial setup and the core features quickly.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="bg-muted-foreground my-1 h-px" />
          <Accordion
            className="flex w-full flex-col"
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            variants={{
              expanded: {
                opacity: 1,
                scale: 1,
              },
              collapsed: {
                opacity: 0,
                scale: 0.7,
              },
            }}
          >
            <AccordionItem value="getting-started" className="py-2">
              <AccordionTrigger className="w-full py-0.5 text-left">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    How do I start with Motion-Primitives?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  Kick off your experience by setting up Motion-Primitives. This
                  section covers the basics of installation and how to add
                  animations to your projects. You&apos;ll get familiar with the
                  initial setup and the core features quickly.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="bg-muted-foreground my-1 h-px" />
        </div>
      </div>
    </section>
  );
}
