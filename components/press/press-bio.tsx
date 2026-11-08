import Image from "next/image";
import { pressPage } from "@/lib/content";
import { CopyButton } from "../copy-button";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   PRESS — BIO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   The medium bio over a close-up portrait. A deep green-black ground fades to
   black at the right, where the portrait (black studio background, so it
   merges) fills the frame; the photo's own left edge is masked, so the
   sweater dissolves into the green with no seam. The bio and its Copy button sit at the bottom left.

   The portrait crop is set in container-query units of the photo frame, so
   the face keeps its size and place at any height (source: head spans 38.5%
   of the image height from 12.5% down, face centred 47% across):
     desktop: head ~80% of the frame height, face centred 73% across;
     phones:  a 60svh frame on top, head ~75% of it, centred.
   ========================================================================== */

export function PressBio() {
  return (
    <section
      id="bio"
      aria-label="Bio"
      data-tone="ink"
      className="on-ink text-cream relative isolate scroll-mt-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #1b2521 0%, #131a17 30%, #050605 58%, #000 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="no-save pointer-events-none absolute inset-x-0 top-0 h-[60svh] overflow-hidden [container-type:size] [mask-image:linear-gradient(to_bottom,#000_55%,transparent_98%)] lg:inset-y-0 lg:h-auto lg:[mask-image:none]"
      >
        <div className="absolute aspect-[2/3] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_24%)] [top:-16cqh] [left:calc(50cqw-61cqh)] [height:195cqh] lg:[top:-20cqh] lg:[left:calc(73cqw-65.2cqh)] lg:[height:208cqh]">
          <Image
            src="/nelson-portrait.jpg"
            alt=""
            fill
            draggable={false}
            sizes="(min-width: 1024px) 75vw, 130vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="gutter-tight relative flex flex-col justify-end pt-[57svh] pb-14 lg:pt-0 lg:min-h-[52.2vw] lg:pb-[5.5rem]">
        <Reveal className="max-w-[42rem] lg:max-w-[46.5vw]">
          <p className="font-sans text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.42]">
            {pressPage.bio}
          </p>
          <div className="mt-6">
            <CopyButton text={pressPage.bio} variant="light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
