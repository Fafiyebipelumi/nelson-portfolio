import Image from "next/image";
import { pressPage } from "@/lib/content";
import { bubbleClip } from "../bubble-clip";
import { CopyButton } from "../copy-button";
import { Reveal } from "../motion-primitives";
import { Stripes } from "../stripes";

/* ============================================================================
   PRESS — STANDARD BIO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Cream band, set in from the edges (6.2vw, as in the design): the portrait
   as a speech bubble (tail dropping from its bottom-right corner, the photo
   running on into it) and the standard bio with its Copy button. The
   portrait is the turtleneck cutout on white, multiplied onto a light grey
   studio wash. Stripes into the black quote band.
   ========================================================================== */

const TAIL = 56;
const CLIP = bubbleClip("right", { radius: 14, tail: TAIL, join: 12 });

export function PressStandardBio() {
  const S = pressPage.standardBio;
  return (
    <section
      aria-labelledby="standard-bio-heading"
      className="bg-cream text-umber"
    >
      <div className="grid gap-10 px-[1.375rem] pt-16 pb-16 sm:px-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:grid-cols-[33.7vw_minmax(0,1fr)] lg:gap-[2.2vw] lg:px-[6.2vw] lg:pt-[8.1rem] lg:pb-[6rem]">
        <Reveal y={28}>
          <div
            className="no-save relative overflow-hidden bg-[radial-gradient(120%_90%_at_50%_30%,#f3f1ec_0%,#e6e2d9_60%,#d6d0c3_100%)]"
            style={{ clipPath: CLIP, paddingBottom: TAIL }}
          >
            <div className="aspect-[485/498]" />
            <Image
              src={S.photo}
              alt="Nelson T. Ajulo"
              fill
              draggable={false}
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 36vw, 92vw"
              className="object-cover mix-blend-multiply"
              style={{ objectPosition: "50% 49%" }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:pt-5">
          <h2
            id="standard-bio-heading"
            className="origin-left font-serif text-[clamp(2.4rem,3.3vw,3.2rem)] leading-none tracking-[-0.02em] [scale:0.88_1]"
          >
            {S.heading}
          </h2>
          <p className="mt-5 font-sans text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.48] tracking-[-0.01em]">
            {S.body}
          </p>
          <div className="mt-5">
            <CopyButton text={S.body} variant="ink" />
          </div>
        </Reveal>
      </div>
      <Stripes from="var(--color-cream)" to="#000" />
    </section>
  );
}
