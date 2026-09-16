import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";
import { Waveform } from "./podcast/waveform";

/* ============================================================================
   09 — PODCAST (homepage teaser)
   ----------------------------------------------------------------------------
   A compact ink panel that trails the show and sends people to /podcast. It
   leads with the invitation, not the archive, because the open call is the
   point — the same emphasis the full page carries.
   ========================================================================== */

export function PodcastTeaser() {
  return (
    <Section tone="ink" grain>
      <SectionBody rhythm="compact">
        <SectionLabel index="09" label="Podcast" tone="ink" />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="mb-7 flex items-center gap-4">
                <Waveform className="h-6" />
                <span className="eyebrow text-slate">
                  {podcast.hero.status}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-display text-bone font-medium">
                {podcast.name}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-subtitle text-ash mt-6 max-w-2xl">
                {podcast.hero.tagline.before}
                <span className="text-signal-bright font-serif italic">
                  {podcast.hero.tagline.emphasis}
                </span>
                {podcast.hero.tagline.after}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-4 lg:pb-2" delay={0.15}>
            <Link
              href="/podcast"
              className="group border-rule-ink hover:border-signal-bright inline-flex w-full items-center justify-between gap-6 border px-6 py-5 transition-colors duration-300 sm:w-auto lg:w-full"
            >
              <span className="flex flex-col">
                <span className="text-bone text-lg font-medium tracking-[-0.02em]">
                  Listen &amp; apply
                </span>
                <span className="eyebrow text-slate mt-1">
                  Guests welcome
                </span>
              </span>
              <ArrowUpRight
                className="text-signal-bright size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  );
}
