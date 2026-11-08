import { fifteenWinsPage } from "@/lib/content";
import { HERO_GLOW } from "../glows";
import { Stripes } from "../stripes";

/* ============================================================================
   15WINS — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Text only on black with the venture pages' edge glows: the "15Wins
   Venture" pill, the two-line serif headline (set at the Joble hero's size,
   ~1009px for the first line at the 1440 frame) and the standing line.
   Fading lines into "What it is".
   ========================================================================== */

export function FifteenWinsHero() {
  const H = fifteenWinsPage.hero;
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: HERO_GLOW }}
      />

      <div className="gutter-tight flex flex-col justify-end pt-32 pb-16 lg:min-h-[44.8vw] lg:pt-[9rem] lg:pb-[7.6rem]">
        <span
          className="animate-rise self-start rounded-full bg-[#4b4b4b] px-3 py-1 font-sans text-[0.8125rem] tracking-[0.01em] uppercase"
          style={{ animationDelay: "0.1s" }}
        >
          {H.eyebrow}
        </span>
        <h1
          className="animate-rise mt-2 w-[calc(100%/0.88)] origin-left font-serif text-[clamp(3.1rem,8.2vw,8.3rem)] leading-[0.86] tracking-[-0.035em] [scale:0.88_1]"
          style={{ animationDelay: "0.2s" }}
        >
          {H.headline.map((line) => (
            <span key={line} className="block lg:whitespace-nowrap">
              {line}
            </span>
          ))}
        </h1>
        <p
          className="animate-rise mt-4 max-w-[43rem] font-sans text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.42] text-[#d6d2c7] lg:mt-3"
          style={{ animationDelay: "0.32s" }}
        >
          {H.body}
        </p>
      </div>

      <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
    </section>
  );
}
