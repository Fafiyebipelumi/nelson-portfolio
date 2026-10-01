import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   F — MEET THE HOST
   ----------------------------------------------------------------------------
   Ties the podcast's credibility back to Nelson's wider positioning. Copy
   verbatim from brief §4.4. Portrait desaturated to sit in the dark palette.
   ========================================================================== */

const host = podcast.host;

export function PodcastHost() {
  return (
    <Section tone="ink" grain>
      <SectionBody>
        <SectionLabel index="04" label={host.eyebrow} tone="podcast" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4" y={28}>
            <div className="border-rule-ink relative aspect-[4/5] w-full max-w-xs overflow-hidden border lg:max-w-none">
              <Image
                src={host.photo}
                alt="Nelson T. Ajulo"
                fill
                sizes="(min-width: 1024px) 30vw, 320px"
                loading="lazy"
                className="object-cover object-[50%_18%] grayscale contrast-[1.05]"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 className="text-title text-bone font-medium">{host.name}</h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="text-ash mt-8 max-w-2xl text-base leading-relaxed sm:text-lg">
                {host.bio}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-bone mt-6 max-w-2xl font-serif text-xl italic">
                {host.line}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <Link
                href={host.cta.href}
                className="link-draw text-airwave hover:text-bone group mt-10 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
              >
                {host.cta.label}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
