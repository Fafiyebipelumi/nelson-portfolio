import { before } from "@/lib/content";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   BEFORE — PREMISE
   ----------------------------------------------------------------------------
   Two-line serif headline, then the four paragraphs in two columns. Closes on
   the fading lines into the lineup.
   ========================================================================== */

export function BeforePremise() {
  const P = before.premise;
  return (
    <section aria-label="About the show" className="bg-umber text-cream">
      <div className="gutter pt-20 pb-20 sm:pt-24 lg:pt-[8.5rem] lg:pb-[7.5rem]">
        <Reveal>
          <h2 className="w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.02] [scale:0.88_1]">
            {P.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-16 gap-y-6 lg:mt-12 lg:grid-cols-2">
          {P.columns.map((col, c) => (
            <Reveal key={c} delay={c * 0.06} className="space-y-6">
              {col.map((p) => (
                <p key={p} className="text-sand max-w-[40rem] font-sans text-[1.0625rem] sm:text-base leading-[1.5] lg:text-[1.0625rem]">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
      <Stripes from="var(--color-umber)" to="#5e5a51" fade />
    </section>
  );
}
