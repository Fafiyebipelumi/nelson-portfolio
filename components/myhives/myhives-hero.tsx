import Image from "next/image";
import { myhivesPage } from "@/lib/content";
import { HERO_GLOW } from "../glows";

/* ============================================================================
   MYHIVES — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with soft glows at the edges, the serif headline and standing
   line on the left, and the BEEKON app artwork on the right, standing on the
   section's bottom edge. The artwork sits at its Figma size (493px wide at a
   1440 frame, i.e. 34.25vw, 7.4vw in from the right). On phones it moves
   under the text, centred.

   The artwork is decorative and marked `no-save` so it reads as part of the
   page: it can't be dragged out, selected or saved by long-press/right-click.
   ========================================================================== */

export function MyhivesHero() {
  const H = myhivesPage.hero;
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      {/* Edge glows, as in the design: blue-violet down the top-left edge,
          a faint amber at the bottom-right corner. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: HERO_GLOW,
        }}
      />

      <div className="gutter-tight relative flex flex-col pt-32 lg:min-h-[max(51.5vw,40rem)] lg:flex-row lg:items-center lg:pt-24">
        <div className="max-w-[44rem] lg:w-[50%] lg:max-w-none lg:pl-[3.5rem] xl:pl-[4.1rem]">
          <h1
            className="animate-rise w-[calc(100%/0.88)] origin-left font-serif text-[clamp(3.4rem,7.5vw,7.4rem)] leading-[0.92] tracking-[-0.035em] [scale:0.88_1] lg:whitespace-nowrap"
            style={{ animationDelay: "0.15s" }}
          >
            {H.headline}
          </h1>
          <p
            className="animate-rise mt-5 max-w-[40rem] font-sans text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.4] text-[#d6d2c7] lg:mt-4"
            style={{ animationDelay: "0.3s" }}
          >
            {H.body}
          </p>
        </div>

        <div
          className="animate-myhives-art relative mx-auto mt-12 w-[min(86vw,26rem)] lg:absolute lg:right-[7.4vw] lg:bottom-0 lg:mt-0 lg:w-[34.25vw]"
          style={{ animationDelay: "0.35s" }}
        >
          <Image
            src={H.image.src}
            alt=""
            width={H.image.width}
            height={H.image.height}
            priority
            draggable={false}
            sizes="(min-width: 1024px) 34vw, 86vw"
            className="no-save h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
