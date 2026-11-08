import { ArrowUpRight } from "lucide-react";
import { joblePage } from "@/lib/content";
import { ActionButton } from "../action-button";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   JOBLE — PROOF  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   One cream row: the small serif "Proof", the evidence line, and "Explore
   Joble" pinned right, all on one centre line. Stacks on small screens.
   Closes on the stripes into the footer.
   ========================================================================== */

export function JobleProof() {
  const P = joblePage.proof;
  return (
    <section aria-labelledby="proof-heading" className="bg-cream text-umber">
      <Reveal>
        <div className="gutter-tight grid items-center gap-6 py-20 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[23%_minmax(0,1fr)_auto] lg:gap-0 lg:py-[7.6rem]">
          <h2
            id="proof-heading"
            className="origin-left font-serif text-[clamp(2.25rem,2.8vw,2.6rem)] leading-none tracking-[-0.04em] [scale:0.88_1] md:col-span-2 lg:col-span-1"
          >
            {P.heading}
          </h2>
          <p className="max-w-[31.5rem] font-sans text-[1.0625rem] leading-[1.42]">
            {P.body}
          </p>
          <div className="lg:justify-self-end">
            <ActionButton href={P.cta.href} variant="ink">
              {P.cta.label}
              <ArrowUpRight
                className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
          </div>
        </div>
      </Reveal>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}
