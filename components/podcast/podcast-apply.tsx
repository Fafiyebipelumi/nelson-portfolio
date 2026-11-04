import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal } from "../motion-primitives";
import { ApplyForm } from "./apply-form";

/* ============================================================================
   PODCAST — GUEST APPLICATIONS  (the centrepiece)
   ----------------------------------------------------------------------------
   The reason the page exists. Ink surface for arrival. Left column carries the
   invitation and who it's for (in prose, per the copy proposal); right column
   carries the application. On mobile the invitation reads first, then the form.
   ========================================================================== */

export function PodcastApply() {
  return (
    <Section id="apply" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="05" label={podcast.apply.eyebrow} tone="podcast" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Invitation */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-display text-bone font-medium">
                {podcast.apply.headline}
              </h2>
            </Reveal>

            <div className="mt-8 max-w-md space-y-6">
              {podcast.apply.intro.map((paragraph, i) => (
                <Reveal key={i} delay={0.06 + i * 0.04}>
                  <p className="text-ash text-base leading-relaxed sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Application */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal y={28}>
              <ApplyForm />
            </Reveal>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
