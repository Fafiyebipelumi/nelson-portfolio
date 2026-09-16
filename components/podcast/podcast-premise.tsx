import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal } from "../motion-primitives";

/* ============================================================================
   PODCAST — PREMISE
   ----------------------------------------------------------------------------
   The editorial statement: what the show is and who it's for. Type-led, on
   paper, in the same manifesto register as the homepage Position section.
   ========================================================================== */

export function PodcastPremise() {
  return (
    <Section id="premise" tone="paper">
      <SectionBody>
        <SectionLabel index="01" label={podcast.premise.eyebrow} />

        <Reveal>
          <h2 className="text-display text-charcoal max-w-5xl font-medium">
            {podcast.premise.headline.before}
            <span className="text-signal font-serif italic">
              {podcast.premise.headline.emphasis}
            </span>
            {podcast.premise.headline.after}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:mt-20 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-7 lg:col-start-6">
            {podcast.premise.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={
                    i === 0
                      ? "text-lead text-charcoal"
                      : "text-graphite text-base leading-relaxed sm:text-[1.0625rem]"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
