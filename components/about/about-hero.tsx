import Image from "next/image";
import { about } from "@/lib/content";
import { Stripes } from "../stripes";

/* ============================================================================
   ABOUT — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Deep green ground, a close-up portrait filling the right of the frame and
   fading into the green, the "About me" pill, the serif headline and the
   standing line. Resolves into the cream story band through the stripes.

   The portrait is the turtleneck cutout on white: `multiply` turns its white
   into the frame's light grey studio tone, as in the design. Its crop is set
   in container-query units (cqw / cqh of the photo frame), so the face keeps
   the same size and place whatever the frame's height:
     desktop: head ~92% of the frame height, face centred at 79.5% across;
     phones:  head ~80% of a 60svh frame, face centred.
   (In the source the head spans 35% of the image height, starting 13% down,
   and the face is centred 46.5% across.)
   ========================================================================== */

export const ABOUT_GREEN = "#17201c";

export function AboutHero() {
  const H = about.hero;
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden"
      style={{ backgroundColor: ABOUT_GREEN }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 isolate h-[60svh] overflow-hidden bg-[linear-gradient(to_bottom,#dcddd9,#c9cbc6)] [container-type:size] lg:inset-y-0 lg:h-auto"
      >
        <div className="animate-about-photo absolute aspect-[2/3] mix-blend-multiply [top:-20cqh] [left:calc(50cqw-71cqh)] [height:229cqh] lg:[top:-29cqh] lg:[left:calc(79.5cqw-81.5cqh)] lg:[height:263cqh]">
          <Image
            src={H.photo}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 95vw, 180vw"
            className="object-cover"
          />
        </div>
        {/* Into the green: from the left on desktop, from below on phones. */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            /* A light shade at the top keeps the header legible on the pale
               photo; the bottom fades into the green under the text. */
            background: `linear-gradient(to bottom, rgb(23 32 28 / 0.55) 0%, transparent 22%, transparent 40%, ${ABOUT_GREEN} 98%)`,
          }}
        />
        <div
          className="absolute inset-0 max-lg:hidden"
          style={{
            background: `linear-gradient(to right, ${ABOUT_GREEN} 0%, ${ABOUT_GREEN} 42%, rgb(23 32 28 / 0.75) 51%, rgb(23 32 28 / 0.3) 58%, transparent 66%)`,
          }}
        />
      </div>

      <div className="gutter relative z-10 flex min-h-[calc(60svh+18rem)] flex-col justify-end pb-14 lg:min-h-[max(51.75vw,38rem)] lg:pb-[clamp(4rem,8.5vw,8.5rem)]">
        <div className="max-w-[42rem] lg:max-w-[46%]">
          <span
            className="animate-rise inline-block rounded-full bg-[#4b504c] px-3.5 py-1 font-sans text-[0.75rem] tracking-[0.01em] uppercase"
            style={{ animationDelay: "0.1s" }}
          >
            {H.eyebrow}
          </span>
          <h1
            className="animate-rise mt-5 w-[calc(100%/0.88)] origin-left font-serif text-[clamp(2.9rem,5.1vw,4.6rem)] leading-[0.95] tracking-[-0.045em] [scale:0.88_1]"
            style={{ animationDelay: "0.2s" }}
          >
            {H.headline}
          </h1>
          <p
            className="animate-rise mt-5 max-w-[41rem] font-sans text-[clamp(1rem,1.22vw,1.125rem)] leading-[1.45] text-[#d6d3ca]"
            style={{ animationDelay: "0.32s" }}
          >
            {H.body}
          </p>
        </div>
      </div>

      <Stripes from={ABOUT_GREEN} className="relative z-10" />
    </section>
  );
}
