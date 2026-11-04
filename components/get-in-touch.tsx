import { ArrowUpRight } from "lucide-react";
import { homeContact } from "@/lib/content";
import { ActionButton } from "./action-button";
import { Reveal } from "./motion-primitives";
import { Stripes } from "./stripes";

/* ============================================================================
   HOME — GET IN TOUCH  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream closing band between two striped dividers: dark into cream above,
   cream back into the dark footer below. Serif title, one paragraph, and the
   dark Contact button.
   ========================================================================== */

export function GetInTouch() {
  return (
    <section id="get-in-touch" className="bg-cream text-umber">
      <Stripes from="var(--color-umber)" to="var(--color-cream)" />

      <div className="gutter py-16 sm:py-20 lg:pt-[7rem] lg:pb-[8.5rem]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,38rem)_minmax(0,1fr)]">
          <Reveal>
            <h2 className="origin-left font-serif text-[clamp(3.25rem,5.6vw,5.25rem)] leading-[0.95] [scale:0.88_1] lg:whitespace-nowrap">
              {homeContact.title}
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="lg:pt-5">
            <p className="font-sans text-[1.0625rem] leading-[1.45] font-medium tracking-[-0.01em] lg:text-[1.1875rem]">
              {homeContact.body}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:flex lg:justify-end lg:pt-3">
            <ActionButton href={homeContact.cta.href} variant="ink">
              {homeContact.cta.label}
              <ArrowUpRight
                className="size-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
          </Reveal>
        </div>
      </div>

      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}
