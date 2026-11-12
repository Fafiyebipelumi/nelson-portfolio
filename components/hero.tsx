import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { homeHero } from "@/lib/content";
import { ActionButton, PlayIcon } from "./action-button";
import { Stripes } from "./stripes";

/* ============================================================================
   01 — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Pure black, the B.png glow on the left, and Nelson's portrait filling the
   right. The portrait has a black studio background, so it merges straight
   into the page with no cut-out or mask.

   The portrait frame reproduces the Figma crop exactly: a 939 x 812 frame
   holding the photo scaled to 1147.74 x 1721.41, offset to (120.08, -152) and
   rotated 4 degrees about its top-left corner (values from the exported SVG,
   converted to percentages of the frame so it scales).

   Server component. The intro animation is CSS (`animate-rise`), so the most
   important screen on the site ships with no JavaScript of its own.
   ========================================================================== */

/* `live`: whether BEFORE season one has started (episode 01 released). Until
   then the button reads "Discover BEFORE" with an arrow, not "Listen to
   BEFORE" with a play icon, so nothing reads as playable before launch. */
export function Hero({ live }: { live: boolean }) {
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      {/* Glow. Its right half sits under the portrait's black background. */}
      <Image
        src="/B.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-left"
      />

      {/* Portrait frame: full height on the right from 1024px. Below that it
          fills the top of the screen with the face in view, fading at its left
          edge so some of the glow still shows. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[-14vw] z-0 aspect-[939/812] h-[50svh] overflow-hidden [mask-image:linear-gradient(to_right,transparent_22%,#000_48%)] sm:right-[-6vw] sm:h-[70svh] lg:right-0 lg:bottom-0 lg:h-auto lg:[mask-image:none]"
      >
        {/* Below 1024px the frame ends mid-screen: its bottom edge fades out
            (a mask, not a black overlay, so the glow shows through). */}
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent_98%)] lg:[mask-image:none]">
          <div
            className="absolute origin-top-left rotate-[4deg]"
            style={{ left: "12.788%", top: "-18.719%", width: "122.23%", height: "212%" }}
          >
            <Image
              src="/nelson-portrait.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 75vw, 130vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Small screens: the text sits over the lower part of the portrait,
          so a black fade keeps it legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-[62%] bg-gradient-to-t from-black via-black/85 to-transparent lg:hidden"
      />

      <div className="gutter relative z-10 flex min-h-[100svh] flex-col justify-end pt-32 pb-14 sm:min-h-[100svh] lg:min-h-[max(100svh,46rem)] lg:pb-14">
        <div className="max-w-[46rem] lg:max-w-[58%]">
          {/* The design sets Instrument Serif about 12% narrower than its
              natural width (as on the intro screen), one line from 1024px. */}
          <h1
            className="animate-rise origin-left font-serif text-[clamp(3.4rem,9.6vw,9.75rem)] leading-[0.86] uppercase [scale:0.88_1] lg:whitespace-nowrap"
            style={{ animationDelay: "0.15s" }}
          >
            {homeHero.title}
          </h1>

          <p
            className="animate-rise mt-5 font-sans text-[clamp(1.5rem,2.85vw,2.6rem)] leading-[1.15] font-medium tracking-[-0.02em] lg:mt-7 lg:whitespace-nowrap"
            style={{ animationDelay: "0.3s" }}
          >
            {homeHero.tagline}
          </p>

          <p
            className="animate-rise text-sand mt-5 max-w-[51rem] font-sans text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.45] lg:mt-7"
            style={{ animationDelay: "0.42s" }}
          >
            {homeHero.standing}
          </p>

          <div
            className="animate-rise mt-8 flex flex-wrap gap-4 lg:mt-10 lg:gap-5"
            style={{ animationDelay: "0.54s" }}
          >
            <ActionButton href={homeHero.ctas.primary.href}>
              {live ? <PlayIcon /> : null}
              {live ? homeHero.ctas.primary.liveLabel : homeHero.ctas.primary.label}
              {live ? null : (
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </ActionButton>
            <ActionButton href={homeHero.ctas.secondary.href} variant="dark">
              {homeHero.ctas.secondary.label}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
          </div>
        </div>
      </div>

      <Stripes className="relative z-10" />
    </section>
  );
}
