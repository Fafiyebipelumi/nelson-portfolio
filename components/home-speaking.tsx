import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeSpeaking } from "@/lib/content";
import { ActionButton } from "./action-button";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

/* ============================================================================
   HOME — SPEAKING  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Serif title and a one-line intro on the left, the invite button on the
   right; below, four talk cards (photo over a cream caption, grey offset
   shadow) that link through to /speaking. Four across on desktop, two on
   tablets, one on phones.
   ========================================================================== */

export function HomeSpeaking() {
  return (
    <section id="speaking" className="bg-umber text-cream">
      <div className="gutter pt-16 pb-24 sm:pt-20 lg:pt-28 lg:pb-[9.5rem]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <h2 className="origin-left font-serif text-[clamp(3.5rem,5.6vw,5.25rem)] leading-[0.95] [scale:0.88_1]">
              {homeSpeaking.title}
            </h2>
            <p className="mt-4 font-sans text-lg font-medium lg:mt-5 lg:text-[1.1875rem]">
              {homeSpeaking.intro}
            </p>
          </Reveal>

          <Reveal delay={0.06} className="sm:pt-3">
            <ActionButton href={homeSpeaking.cta.href}>
              {homeSpeaking.cta.label}
              <ArrowUpRight
                className="size-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </ActionButton>
          </Reveal>
        </div>

        <Stagger className="mx-auto mt-14 grid max-w-[81rem] gap-6 sm:grid-cols-2 lg:mt-[clamp(5rem,10vw,9rem)] lg:grid-cols-4 lg:gap-5">
          {homeSpeaking.talks.map((talk) => (
            <StaggerItem key={talk.title}>
              <Link
                href="/speaking"
                className="group block h-full overflow-hidden rounded-[7px] bg-cream text-umber shadow-[4px_4px_0_0_#8f8a7d] transition-[transform,box-shadow] duration-200 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#8f8a7d]"
              >
                <div className="relative aspect-[308/186] overflow-hidden">
                  <Image
                    src={talk.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 308px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="flex min-h-[5.5rem] items-start justify-center px-5 pt-5 pb-5 text-center font-sans text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.01em]">
                  {talk.title}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
