import { ArrowUpRight } from "lucide-react";
import { ActionButton } from "./action-button";
import { Reveal } from "./motion-primitives";
import { Stripes } from "./stripes";

/* ============================================================================
   CLOSE BAND  (redesign system, November 2026)
   ----------------------------------------------------------------------------
   The cream sign-off band of the redesign (as the BEFORE newsletter): the
   serif heading on the left, a short line and the dark action on the right,
   closing on the stripes into the dark footer. Used by /ventures and
   /ai-africa, and anywhere a page ends on one call to action.
   ========================================================================== */

export function CloseBand({
  heading,
  body,
  cta,
  from = "var(--color-umber)",
}: {
  heading: string;
  body: string | readonly string[];
  cta: { label: string; href: string };
  /** Colour of the section above, which the stripes start from. */
  from?: string;
}) {
  return (
    <section aria-label={heading} className="bg-cream text-umber">
      <Stripes from={from} to="var(--color-cream)" />
      <div className="gutter grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16 lg:py-24">
        <Reveal>
          <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="space-y-4 font-sans text-base leading-[1.45] font-medium lg:text-[1.0625rem]">
            {(typeof body === "string" ? [body] : body).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-7">
            <ActionButton href={cta.href} variant="ink">
              {cta.label}
              <ArrowUpRight
                className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
          </div>
        </Reveal>
      </div>
      <Stripes from="var(--color-cream)" to="var(--color-umber)" />
    </section>
  );
}
