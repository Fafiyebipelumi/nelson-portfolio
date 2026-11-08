import { ArrowUpRight } from "lucide-react";
import { myhivesPage } from "@/lib/content";
import { ActionButton } from "../action-button";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   MYHIVES — FOR EMPLOYERS AND INSTITUTIONS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band: the serif heading over two dark cards (Employer Nest and the
   Queen Badge, the latter led by a short white rule as in the design), then
   Partners and People on the same two-column grid, each under a tan rule,
   and the two actions. Meets the dark section above edge to edge, as in the
   design, and closes on the stripes into the footer.
   ========================================================================== */

export function MyhivesInstitutions() {
  const I = myhivesPage.institutions;
  return (
    <section
      aria-labelledby="institutions-heading"
      className="bg-cream text-umber"
    >
      <div className="gutter-tight pt-16 pb-20 sm:pt-20 lg:pt-[5.5rem] lg:pb-24">
        <Reveal>
          <h2
            id="institutions-heading"
            className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.045em] [scale:0.88_1]"
          >
            {I.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-[2.1rem] lg:mt-11">
          {I.cards.map((card, i) => (
            <Reveal key={card.text} delay={i * 0.06} className="h-full">
              <div className="bg-umber text-cream h-full rounded-[20px] px-7 pt-8 pb-12 sm:px-10 lg:min-h-[14.5rem] lg:pt-10">
                {card.rule ? (
                  <span
                    aria-hidden="true"
                    className="bg-cream mb-7 block h-[2px] w-8"
                  />
                ) : null}
                <p className="max-w-[42rem] font-sans text-[1.0625rem] leading-[1.42]">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-[2.1rem] lg:mt-[12.5rem]">
          {[I.partners, I.people].map((block, i) => (
            <Reveal key={block.heading} delay={i * 0.06}>
              <span
                aria-hidden="true"
                className="block h-[2px] w-10 bg-[#d9a46b]"
              />
              <h2 className="mt-7 origin-left font-serif text-[clamp(2.5rem,4.6vw,4.1rem)] leading-none tracking-[-0.02em] [scale:0.88_1]">
                {block.heading}
              </h2>
              <p className="mt-7 max-w-[34rem] font-sans text-[1.0625rem] leading-[1.45]">
                {block.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-16 flex flex-wrap gap-5 lg:mt-[8.5rem]">
            <ActionButton
              href={I.ctas.primary.href}
              variant="ink"
              className="shadow-[4px_4px_0_0_#fbefc4]! hover:shadow-[2px_2px_0_0_#fbefc4]!"
            >
              {I.ctas.primary.label}
              <ArrowUpRight
                className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
            <ActionButton
              href={I.ctas.secondary.href}
              variant="light"
              className="border-umber border bg-white!"
            >
              {I.ctas.secondary.label}
            </ActionButton>
          </div>
        </Reveal>
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}
