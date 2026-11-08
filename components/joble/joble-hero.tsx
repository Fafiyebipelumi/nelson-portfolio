import Image from "next/image";
import { joblePage } from "@/lib/content";
import { HERO_GLOW } from "../glows";
import { Stripes } from "../stripes";

/* ============================================================================
   JOBLE — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with the venture pages' edge glows. Left: the "Joble" pill, the
   two-line serif headline and the problem statement. Right: a dark framed
   panel (44vw x 33.3vw at the 1440 frame) holding the product player still
   at its Figma size, centred. Fading lines into "What it is".

   The player is a still with the play mark drawn in; it is decorative and
   `no-save`, so it can't be dragged, selected or saved as an image.
   ========================================================================== */

export function JobleHero() {
  const H = joblePage.hero;
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

      <div className="gutter-tight grid items-center gap-12 pt-32 pb-12 lg:grid-cols-[minmax(0,1fr)_44vw] lg:gap-8 lg:pt-[9.5rem] lg:pb-5">
        <div>
          <span
            className="animate-rise inline-block rounded-full bg-[#4b4b4b] px-3 py-1 font-sans text-[0.8125rem] tracking-[0.01em] uppercase"
            style={{ animationDelay: "0.1s" }}
          >
            {H.eyebrow}
          </span>
          <h1
            className="animate-rise mt-1 w-[calc(100%/0.88)] origin-left font-serif text-[clamp(3.4rem,8.2vw,8.3rem)] leading-[0.86] tracking-[-0.035em] [scale:0.88_1]"
            style={{ animationDelay: "0.2s" }}
          >
            {H.headline.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
          <p
            className="animate-rise mt-3 max-w-[42rem] font-sans text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.42] text-[#d6d2c7] lg:mt-2"
            style={{ animationDelay: "0.32s" }}
          >
            {H.body}
          </p>
        </div>

        <div
          className="animate-rise flex aspect-[881/665] items-center justify-center rounded-[14px] border border-white/[0.09] bg-[#141414] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]"
          style={{ animationDelay: "0.4s" }}
        >
          <Image
            src={H.player.src}
            alt=""
            width={H.player.width}
            height={H.player.height}
            unoptimized
            priority
            draggable={false}
            className="no-save h-auto w-[82.6%] rounded-[1.6vw] lg:rounded-[1.1vw]"
          />
        </div>
      </div>

      <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
    </section>
  );
}
