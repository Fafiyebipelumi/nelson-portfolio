import Image from "next/image";
import { profile } from "@/lib/content";
import { HeroVisual } from "./hero-visual";

/* ============================================================================
   01 — HERO
   ----------------------------------------------------------------------------
   Server component. The intro reveal is CSS-only (`animate-rise`), staggered
   with inline delays, so the most important screen on the site ships with zero
   JavaScript of its own.

   Composition: a three-band editorial page — meta rail, the name set as large
   as the viewport will carry, reading matter on the baseline.

   The portrait is placed as a full-height column on the right edge rather than
   inline at the bottom. Two reasons: inline, its height *added* to the hero and
   pushed the statement below the fold on a 900px laptop; as a column its height
   is governed by the hero instead. It also stops reading as a pasted thumbnail
   and starts reading as atmosphere, which is the more expensive effect.

   Desktop only, deliberately. On mobile the hero is pure typography — faster to
   paint (the LCP becomes text) and stronger to look at — and his face appears
   immediately below in section 02 anyway.

   Greyscale is not a stylistic tic: the backdrop of the source photograph is
   purple, which has no place in this palette.
   ========================================================================== */

export function Hero() {
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink bg-ink text-bone grain relative isolate overflow-hidden"
    >
      <HeroVisual />

      {/* Portrait column — right edge, dissolving into the ink on every side.
          The fade is done by masking the image itself rather than laying an
          opaque ink gradient over it. An overlay also hid the measuring grid
          underneath, which produced a visible vertical seam down the page;
          masking lets the grid run straight through. The two masks are nested
          rather than composited, which avoids relying on mask-composite. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-1 hidden w-[38%] lg:block"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 11%, #000 74%, transparent 99%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 11%, #000 74%, transparent 99%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.22) 30%, #000 74%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.22) 30%, #000 74%)",
          }}
        >
          <Image
            src="/nelson-ta1.jpeg"
            alt=""
            fill
            /* Below lg the element is display:none, so hint a trivially small
               candidate rather than downloading a desktop-sized crop. */
            sizes="(min-width: 1024px) 38vw, 1px"
            priority
            className="object-cover object-[46%_50%] opacity-80 grayscale contrast-[1.05]"
          />
        </div>
      </div>

      <div aria-hidden="true" className="grain-layer z-1" />

      <div className="gutter relative z-10 flex min-h-dvh flex-col justify-between pt-24 pb-10 sm:pt-32 sm:pb-12 lg:pb-16">
        {/* ---- Meta rail ----
            Stacked to the left at every breakpoint rather than justified
            across the full width. Justified, the roles line ran into the
            bright window highlight in the portrait and lost its contrast;
            the right half of the rail is the portrait's territory. */}
        <div
          className="animate-rise border-rule-ink space-y-2.5 border-b pb-5"
          style={{ animationDelay: "0.1s" }}
        >
          {/* <p className="eyebrow text-ash">{profile.location}</p> */}
          <p className="eyebrow text-slate">
            {profile.roles.map((role, i) => (
              <span key={role}>
                {i > 0 ? <span className="text-signal-bright"> · </span> : null}
                {role}
              </span>
            ))}
          </p>
        </div>

        {/* ---- Name ---- */}
        <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
          {/* The two lines are separate blocks for the staggered reveal, so an
              explicit space keeps the accessible name "Nelson T. Ajulo" rather
              than "NelsonT. Ajulo". */}
          <h1 className="text-hero font-medium uppercase">
            <span
              className="animate-rise block"
              style={{ animationDelay: "0.22s" }}
            >
              {profile.firstName}
            </span>{" "}
            <span
              className="animate-rise text-ash block"
              style={{ animationDelay: "0.34s" }}
            >
              {profile.lastName}
            </span>
          </h1>
        </div>

        {/* ---- Reading matter ---- */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div
            className="animate-rise lg:col-span-5"
            style={{ animationDelay: "0.46s" }}
          >
            <p className="text-subtitle text-bone max-w-xl font-normal">
              Building technology that acts when people cannot
              <span className="text-signal-bright"> — </span>
              and{" "}
              <span className="font-serif italic">
                intelligence that helps them do more
              </span>
              .
            </p>
          </div>

          <div
            className="animate-rise lg:col-span-3 lg:col-start-7"
            style={{ animationDelay: "0.58s" }}
          >
            <p className="text-ash max-w-sm text-sm leading-relaxed">
              {profile.standing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
