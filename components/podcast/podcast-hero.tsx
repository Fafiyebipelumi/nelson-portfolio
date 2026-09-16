import { ArrowUpRight } from "lucide-react";
import { podcast } from "@/lib/content";
import { Waveform } from "./waveform";

/* ============================================================================
   PODCAST — HERO
   ----------------------------------------------------------------------------
   Ink surface (so the shared header reads light over it, as on the home hero).
   CSS-only intro reveal, no client JS. The subscribe links are placeholders
   until the show is hosted; a discreet "working title" tag keeps the concept
   honest while it's shown to Nelson.
   ========================================================================== */

export function PodcastHero() {
  return (
    <section
      data-tone="ink"
      className="on-ink bg-ink text-bone grain relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="grain-layer z-1" />

      <div className="gutter relative z-10 flex min-h-[86dvh] flex-col justify-between pt-28 pb-14 sm:pt-36 lg:pb-20">
        {/* Top rail */}
        <div
          className="animate-rise border-rule-ink flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b pb-5"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="eyebrow text-ash">{podcast.hero.eyebrow}</p>
          <div className="flex items-center gap-4">
            <Waveform className="h-5" />
            <span className="eyebrow text-slate">{podcast.hero.status}</span>
          </div>
        </div>

        {/* Title block */}
        <div className="flex flex-1 flex-col justify-center py-14 sm:py-20">
          {podcast.nameIsPlaceholder ? (
            <span
              className="animate-rise eyebrow text-slate mb-6 block"
              style={{ animationDelay: "0.2s" }}
            >
              
            </span>
          ) : null}

          <h1
            className="animate-rise text-hero text-bone font-medium uppercase"
            style={{ animationDelay: "0.28s" }}
          >
            {podcast.name}
          </h1>

          <p
            className="animate-rise text-subtitle text-ash mt-8 max-w-3xl"
            style={{ animationDelay: "0.42s" }}
          >
            {podcast.hero.tagline.before}
            <span className="text-signal-bright font-serif italic">
              {podcast.hero.tagline.emphasis}
            </span>
            {podcast.hero.tagline.after}
          </p>
        </div>

        {/* Standing + subscribe */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <p
            className="animate-rise text-ash lg:col-span-6 max-w-xl text-base leading-relaxed"
            style={{ animationDelay: "0.54s" }}
          >
            {podcast.hero.standing}
          </p>

          <div
            className="animate-rise lg:col-span-5 lg:col-start-8"
            style={{ animationDelay: "0.62s" }}
          >
            <p className="eyebrow text-slate mb-4">Listen on</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {podcast.subscribe.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="link-draw text-ash hover:text-bone group inline-flex items-center gap-1.5 text-sm transition-colors"
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
      </div>
    </section>
  );
}
