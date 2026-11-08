import { ArrowUpRight } from "lucide-react";
import { fifteenWinsPage } from "@/lib/content";
import { ActionButton } from "../action-button";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   15WINS — HOW TO APPROACH  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band: the serif heading with the enquiries button under it on the
   left, the one-page brief on the right (its column starts 55.4% across the
   content width, top-aligned with the heading). Stripes into the footer.
   ========================================================================== */

export function FifteenWinsApproach() {
  const A = fifteenWinsPage.approach;
  return (
    <section aria-labelledby="approach-heading" className="bg-cream text-umber">
      <div className="gutter-tight grid gap-8 pt-16 pb-20 lg:grid-cols-[55.4%_minmax(0,1fr)] lg:gap-0 lg:pt-[8.1rem] lg:pb-[7.6rem]">
        <Reveal>
          <h2
            id="approach-heading"
            className="origin-left font-serif text-[clamp(2.75rem,5vw,4.6rem)] leading-none tracking-[-0.045em] [scale:0.88_1]"
          >
            {A.heading}
          </h2>
          <div className="mt-8 lg:mt-10">
            <ActionButton
              href={A.cta.href}
              variant="ink"
              className="shadow-[4px_4px_0_0_#fbefc4]! hover:shadow-[2px_2px_0_0_#fbefc4]! lg:px-[1.9rem]"
            >
              {A.cta.label}
              <ArrowUpRight
                className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="max-w-[36rem] font-sans text-[1.0625rem] leading-[1.42] lg:pt-1">
            {A.body}
          </p>
        </Reveal>
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}
