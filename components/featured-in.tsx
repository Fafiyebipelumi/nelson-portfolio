import type { CSSProperties } from "react";
import Image from "next/image";
import { featuredIn, type Outlet } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   07 — FEATURED IN
   ----------------------------------------------------------------------------
   A slow, seamless marquee of publication logos — a passing credit roll rather
   than a static logo wall.

   Rendering notes:
   • The supplied PNG logos are black artwork on a white background. Laid on the
     warm paper surface that would show a white card behind each one, so they
     are composited with `mix-blend-mode: multiply`: white drops out, the mark
     stays and picks up the paper tone. (The Washington Post SVG is already
     transparent; multiply leaves it unchanged.)
   • Every logo is rendered at a uniform optical height with width following its
     intrinsic ratio, and muted to a common weight that lifts on hover so the
     row reads as one family rather than five mismatched brand assets.

   Motion is pure CSS — three tiled copies of the row on a single translated
   track — pausing on hover/focus and collapsing to a static centred wrap under
   reduced-motion. No client JavaScript.
   ========================================================================== */

function Logo({ outlet, decorative }: { outlet: Outlet; decorative: boolean }) {
  return (
    <Image
      src={outlet.src}
      alt={decorative ? "" : outlet.name}
      width={outlet.width}
      height={outlet.height}
      aria-hidden={decorative || undefined}
      draggable={false}
      style={{ "--fi-s": outlet.scale ?? 1 } as CSSProperties}
      /* `contrast` clips the slightly-off-white PNG backgrounds (Bloomberg,
         TechCrunch) back to pure white so multiply drops them cleanly, without
         lightening the black marks. */
      className="fi-logo shrink-0 opacity-65 mix-blend-multiply transition-opacity duration-300 select-none [filter:contrast(1.25)] hover:opacity-100"
    />
  );
}

function MarqueeRow({ decorative = false }: { decorative?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
      // Only the first copy is semantic; the tiled copies exist purely to make
      // the loop seamless and are hidden from assistive tech and reduced-motion
      // layout.
      {...(decorative ? { "aria-hidden": true, "data-marquee-dupe": "" } : {})}
    >
      {featuredIn.outlets.map((outlet) => (
        <li key={`${decorative ? "d" : "o"}-${outlet.name}`}>
          <Logo outlet={outlet} decorative={decorative} />
        </li>
      ))}
    </ul>
  );
}

export function FeaturedIn() {
  return (
    <Section tone="paper">
      <SectionBody>
        <SectionLabel index="07" label={featuredIn.eyebrow} />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="text-title text-charcoal max-w-2xl font-medium">
              {featuredIn.headline.before}
              <span className="text-signal font-serif italic">
                {featuredIn.headline.emphasis}
              </span>
              {featuredIn.headline.after}
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.06}>
            <p className="text-graphite text-sm leading-relaxed">
              Coverage and commentary as MyHives, BEEKON and Nelson&rsquo;s work
              enter the wider conversation on AI, safety and opportunity.
            </p>
          </Reveal>
        </div>
      </SectionBody>

      {/* Marquee sits outside the gutter so it can run edge to edge.
          `bg-paper` on the track matters: the track is transformed, which makes
          it its own stacking context, so `mix-blend-multiply` on the logos has
          nothing to blend against unless the paper is painted here. Without it
          the white logo backgrounds show through as pale boxes. */}
      <div className="edge-fade-x border-rule overflow-hidden border-y py-9 sm:py-12">
        <div className="marquee-track bg-paper" aria-label="Featured in">
          <MarqueeRow />
          <MarqueeRow decorative />
          <MarqueeRow decorative />
        </div>
      </div>
    </Section>
  );
}
