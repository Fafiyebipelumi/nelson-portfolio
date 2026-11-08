import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { before, beforePreview } from "@/lib/content";
import type { Episode } from "@/lib/episodes";
import { ActionButton, PlayIcon } from "./action-button";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   HOME — BEFORE (the podcast)  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Pure black. Left: pill label, the show name in Instrument Serif, the
   positioning line, the premise, season timing and the actions. Right: the
   cover art at its Figma size, linking to the show.

   Until episode 01 is released nothing here is playable: the block reads
   "Season one begins January 2027", with the trailer button if a trailer is
   set and the guest application. Once season one is live it switches to
   "Latest episode", "All episodes" and "Apply to be a guest" (copy v3.1).

   The cover is the designer's own vector export (BEFORE.svg, with its salmon
   offset shadow built in), served as-is: it is already tiny and scales
   perfectly, so it skips the image optimiser.
   ========================================================================== */

export function BeforePreview({ live, latest }: { live: boolean; latest: Episode | null }) {
  const { ctas, cover } = beforePreview;
  const trailer = before.trailer;

  return (
    <section id="before" data-tone="ink" className="on-ink text-cream bg-black">
      <div className="gutter grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,35rem)] lg:gap-12 lg:py-[7.5rem]">
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-[#3a3833] px-4 py-1.5 font-sans text-[0.8125rem] tracking-[0.02em] uppercase">
              {beforePreview.eyebrow}
            </span>
          </Reveal>

          {/* Narrowed like every Instrument Serif heading in the design. */}
          <Reveal delay={0.05}>
            <h2 className="mt-5 origin-left font-serif text-[clamp(3rem,4.6vw,4.25rem)] leading-[0.9] [scale:0.88_1]">
              {beforePreview.name}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[40rem] font-sans text-[clamp(1.45rem,2.1vw,1.95rem)] leading-[1.12] font-medium tracking-[-0.025em]">
              {beforePreview.headline}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-sand mt-5 max-w-[42rem] font-sans text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.45]">
              {beforePreview.body}
            </p>
            {live ? (
              <p className="text-sand mt-6 font-sans text-[clamp(1rem,1.2vw,1.15rem)]">
                {beforePreview.season}
              </p>
            ) : (
              <p className="mt-7 font-sans text-[clamp(1.2rem,1.6vw,1.5rem)] leading-tight font-medium tracking-[-0.02em]">
                {beforePreview.prelaunch}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-4">
              {live ? (
                <>
                  <ActionButton href={latest ? `/before/${latest.slug}` : ctas.latest.href}>
                    <PlayIcon />
                    {ctas.latest.label}
                  </ActionButton>
                  <ActionButton href={ctas.episodes.href} variant="dark">
                    {ctas.episodes.label}
                    <Arrow />
                  </ActionButton>
                </>
              ) : trailer.href ? (
                <ActionButton href={trailer.href}>
                  <PlayIcon />
                  {trailer.cta}
                </ActionButton>
              ) : null}
              <ActionButton href={ctas.apply.href} variant={live || trailer.href ? "dark" : "light"}>
                {ctas.apply.label}
                <Arrow />
              </ActionButton>
            </div>
          </Reveal>
        </div>

        <Reveal y={28}>
          <Link
            href={ctas.show.href}
            aria-label={`${beforePreview.name}: go to the podcast`}
            className="mx-auto block w-full max-w-[35rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:mr-0"
          >
            <Image
              src={cover.src}
              alt={`${beforePreview.name}, a MyHives Original: podcast cover art`}
              width={cover.width}
              height={cover.height}
              unoptimized
              className="h-auto w-full"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <ArrowUpRight
      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={2}
      aria-hidden="true"
    />
  );
}
