import type { CSSProperties } from "react";
import { writingPage } from "@/lib/content";
import { Stripes } from "../stripes";
import { GradientPill } from "../gradient-pill";
import { LIME_GLOW } from "../glows";

/* ============================================================================
   WRITING — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with a blue-violet glow down the left edge and a broad yellow-green
   one at the right, the centred serif title and the premise, then the essay
   pills: gradient capsules, each with a dark arrow disc, at their Figma
   widths (px at the 1440 frame, so vw here), which wrap into the design's
   centred rows of three and two. On phones
   they stack full width. A pill links to its essay once one with the same
   title exists (`hrefs`); until then it is shown but inert.
   ========================================================================== */

export function WritingHero({ hrefs }: { hrefs: readonly (string | null)[] }) {
  const H = writingPage.hero;
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: LIME_GLOW }}
      />

      <div className="gutter-tight flex flex-col items-center pt-32 pb-20 text-center lg:pt-[11.9rem] lg:pb-[8.6rem]">
        <h1
          className="animate-rise font-serif text-[clamp(3.2rem,7.45vw,7.4rem)] leading-none tracking-[-0.035em] [scale:0.88_1] [-webkit-text-stroke:0.6px_currentColor]"
          style={{ animationDelay: "0.15s" }}
        >
          {H.headline}
        </h1>
        <p
          className="animate-rise mt-7 max-w-[66.5rem] font-sans text-[1.0625rem] leading-[1.45] text-[#d6d2c7] lg:mt-[2.4rem]"
          style={{ animationDelay: "0.3s" }}
        >
          {H.body[0]} <br className="hidden lg:inline" />
          {H.body[1]}
        </p>

        <ul className="mt-10 flex w-full flex-col gap-3 lg:mt-[3.4rem] lg:max-w-none lg:max-w-[94vw] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-[0.6vw] lg:gap-y-4">
          {writingPage.featured.map((pill, i) => (
            <li
              key={`${pill.title}-${i}`}
              className="animate-rise lg:w-[var(--pill-w)]"
              style={
                {
                  "--pill-w": `${(pill.width / 1440) * 100}vw`,
                  animationDelay: `${0.42 + i * 0.07}s`,
                } as CSSProperties
              }
            >
              <GradientPill
                label={pill.title}
                from={pill.from}
                to={pill.to}
                arrow={pill.arrow}
                href={hrefs[i] ?? null}
              />
            </li>
          ))}
        </ul>
      </div>

      <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
    </section>
  );
}
