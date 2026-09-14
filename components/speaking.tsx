import { speaking } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

/* ============================================================================
   08 — SPEAKING / GLOBAL PRESENCE
   ----------------------------------------------------------------------------
   Restrained by instruction and by judgement: no logo wall, no event photos,
   no attendance figures. Topics are set large because the subjects are the
   substance, and a large numbered list reads as a programme rather than a
   feature grid.

   The only named engagement on the site sits in section 06, where it can be
   properly sourced. Nothing is invented here to pad the section out.
   ========================================================================== */

export function Speaking() {
  return (
    <Section tone="deep">
      <SectionBody>
        <SectionLabel index="08" label={speaking.eyebrow} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-title text-charcoal font-medium">
                {speaking.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-graphite mt-8 max-w-md text-base leading-relaxed">
                {speaking.body}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-mute mb-6">Subjects</p>
            </Reveal>

            <Stagger className="border-rule-strong border-t">
              {speaking.topics.map((topic, i) => (
                <StaggerItem key={topic} className="border-rule border-b">
                  <div className="flex items-baseline gap-5 py-5 sm:gap-7">
                    <span className="eyebrow text-signal shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-charcoal text-lg font-medium tracking-[-0.02em] sm:text-xl">
                      {topic}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
