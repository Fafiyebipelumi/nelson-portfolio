import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { podcast } from "@/lib/content";
import { Waveform } from "./waveform";
import { PodcastCover } from "./podcast-cover";

/* ============================================================================
   PODCAST — HERO
   ----------------------------------------------------------------------------
   Ink surface (so the shared header reads light over it, as on the home hero).
   CSS-only intro reveal, no client JS.

   Composition deliberately mirrors the home hero: the type runs full width on
   the left, and a photograph sits as a full-height column on the right,
   desaturated and masked so it dissolves into the ink on every edge rather
   than sitting in a box. An earlier version put the cover art here instead,
   which repeated the wordmark at the same scale as the h1 and read as a
   duplication rather than a composition.

   The cover art is still present, but as a small badge beside the platform
   links, where it does the job a cover actually does on a player.

   Desktop only, like the home hero: on mobile this is pure typography, which
   paints faster (the LCP becomes text) and reads stronger than a cropped photo.
   ========================================================================== */

export function PodcastHero() {
  return (
    <section
      data-tone="ink"
      className="on-ink bg-ink text-bone grain relative isolate overflow-hidden"
    >
      {/* Microphone column. Two nested masks (vertical, then horizontal) rather
          than an opaque overlay, so the grain underneath runs straight through
          and no vertical seam appears down the page. */}
      {podcast.hero.image ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-1 hidden w-[42%] lg:block"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 12%, #000 76%, transparent 99%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 12%, #000 76%, transparent 99%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 32%, #000 76%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 32%, #000 76%)",
            }}
          >
            <Image
              src={podcast.hero.image}
              alt=""
              fill
              /* Below lg the element is display:none, so hint a trivially small
                 candidate rather than downloading a desktop-sized crop. */
              sizes="(min-width: 1024px) 42vw, 1px"
              priority
              /* The source is a wide shot with the mic head around 30% across
                 and a neon blue/magenta room behind it. A low object-position
                 pushes the mic toward the opaque side of the mask, and
                 greyscale removes a colour cast that has no place in this
                 palette (the same reason the home hero portrait is desaturated). */
              className="object-cover object-[16%_48%] opacity-70 grayscale contrast-[1.12]"
            />
          </div>
        </div>
      ) : null}

      <div aria-hidden="true" className="grain-layer z-1" />

      <div className="gutter relative z-10 flex min-h-dvh flex-col justify-between pt-28 pb-12 sm:pt-32 lg:pb-16">
        {/* Top rail */}
        <div
          className="animate-rise border-rule-ink flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b pb-5"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="eyebrow text-airwave">{podcast.hero.eyebrow}</p>
          <div className="flex items-center gap-4">
            <Waveform tone="podcast" className="h-5" />
            <span className="eyebrow text-slate">{podcast.hero.status}</span>
          </div>
        </div>

        {/* Title block. Width-capped on desktop so the type never runs into the
            bright part of the photograph. */}
        <div className="flex flex-1 flex-col justify-center py-12 sm:py-16">
          <h1
            className="animate-rise text-display text-bone font-medium uppercase lg:max-w-[64%]"
            style={{ animationDelay: "0.24s" }}
          >
            {podcast.name}
          </h1>

          <p
            className="animate-rise text-subtitle text-ash mt-7 max-w-2xl"
            style={{ animationDelay: "0.38s" }}
          >
            {podcast.hero.tagline.before}
            <span className="text-airwave">
              {podcast.hero.tagline.emphasis}
            </span>
            {podcast.hero.tagline.after}
          </p>
        </div>

        {/* Standing, platform links and the owned-audience CTA. Kept inside the
            left columns, which is the type's territory; the right is the
            photograph's. */}
        <div className="grid lg:grid-cols-12">
          <div
            className="animate-rise lg:col-span-7"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-ash max-w-xl text-base leading-relaxed">
              {podcast.hero.standing}
            </p>

            <div className="mt-9 flex items-center gap-5">
              {/* Cover art, badge size, the way a player shows it. */}
              <div className="border-rule-ink w-16 shrink-0 overflow-hidden border sm:w-[4.5rem]">
                <PodcastCover variant="compact" />
              </div>

              <div>
                <p className="eyebrow text-slate mb-3">Listen on</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {podcast.subscribe.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        className="link-draw text-ash hover:text-airwave group inline-flex items-center gap-1.5 text-sm transition-colors"
                      >
                        {s.label}
                        <ArrowUpRight
                          className="size-3.5 opacity-60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Secondary CTA: the owned audience (brief §4.1 A, Job 2). */}
            <a
              href="#newsletter"
              className="group border-rule-ink hover:border-airwave mt-8 inline-flex items-center gap-2.5 border px-5 py-3 transition-colors duration-300"
            >
              <Mail
                className="text-airwave size-4 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="text-bone text-sm font-medium">
                Get the show in your inbox each week
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
