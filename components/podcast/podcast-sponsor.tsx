import { ArrowUpRight } from "lucide-react";
import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   H — SPONSOR
   ----------------------------------------------------------------------------
   Lets brands assess reach and fit quickly. Copy verbatim from brief §4.4.
   Reach stats get added once available.
   ========================================================================== */

const sponsor = podcast.sponsor;

export function PodcastSponsor() {
  return (
    <Section id="sponsor" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="06" label={sponsor.eyebrow} tone="podcast" />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-title text-bone font-medium">{sponsor.headline}</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-ash mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                {sponsor.body}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pb-2" delay={0.1}>
            <a
              href={sponsor.cta.href}
              className="group border-rule-ink hover:border-airwave inline-flex w-full items-center justify-between gap-6 border px-6 py-5 transition-colors duration-300"
            >
              <span className="text-bone text-base font-medium">{sponsor.cta.label}</span>
              <ArrowUpRight
                className="text-airwave size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  );
}
