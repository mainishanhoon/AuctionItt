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
      id="faqs"
      className="bg-gradient-to-t from-black to-emerald-500 py-18 text-white md:py-24"
    >
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tight md:text-6xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-white/70 md:text-xl">
          Find clear answers to common questions and confidently navigate every
          step of your auction journey.
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
                    How do I place a bid on an item?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  To place a bid, log into your account and navigate to the item
                  you&apos;re interested in. On the item&apos;s detail page,
                  enter your desired bid amount and click &quot;Bid Now.&quot;
                  You&apos;ll instantly become the highest bidder if your amount
                  exceeds the current bid. Keep an eye on it—auctions can move
                  fast!
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
                    What happens if someone outbids me?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  You&apos;ll receive a real-time notification the moment
                  someone outbids you, so you never miss a beat. You can choose
                  to increase your bid immediately to stay in the game or wait
                  and strategize based on the competition. It&apos;s all about
                  timing and quick decisions.
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
                    Is there a fee to join or bid?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  No, creating an account and placing bids is completely free.
                  You&apos;re only charged if you win an auction, and the final
                  amount will include your winning bid and any applicable taxes
                  or shipping fees. We believe in a transparent, no-surprise
                  experience.
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
                    How do I know if I won an auction?
                  </div>
                  <span className="relative cursor-pointer">
                    <IconMinus className="absolute size-5 -rotate-90 transition-transform duration-500 group-data-expanded:-rotate-180" />
                    <IconMinus className="size-5 transition-transform duration-500" />
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <p className="pt-2">
                  When the auction ends, the highest bidder is instantly
                  notified via email and in-app alert. Your dashboard will also
                  update with a “You Won!” tag next to the item. From there, you
                  can proceed with secure payment and shipping details—all in
                  just a few clicks.
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
