import { podcast } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "../section";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";
import { ApplyForm } from "./apply-form";

/* ============================================================================
   PODCAST — BE PART OF IT  (the centrepiece)
   ----------------------------------------------------------------------------
   The reason the page exists. Ink surface for arrival. Left column carries the
   invitation and who it's for; right column carries the application. On mobile
   the invitation reads first, then the form.
   ========================================================================== */

export function PodcastApply() {
  return (
    <Section id="apply" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="03" label={podcast.apply.eyebrow} tone="ink" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Invitation */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-display text-bone font-medium">
                {podcast.apply.headline.before}
                <span className="text-signal-bright font-serif italic">
                  {podcast.apply.headline.emphasis}
                </span>
                {podcast.apply.headline.after}
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="text-ash mt-8 max-w-md text-base leading-relaxed sm:text-lg">
                {podcast.apply.intro}
              </p>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <p className="eyebrow text-slate mb-5">Who we&rsquo;re looking for</p>
              </Reveal>
              <Stagger className="border-rule-ink border-t">
                {podcast.apply.lookingFor.map((item) => (
                  <StaggerItem key={item} className="border-rule-ink border-b">
                    <div className="flex items-baseline gap-4 py-4">
                      <span
                        aria-hidden="true"
                        className="bg-signal-bright mt-2 size-1.5 shrink-0 rounded-full"
                      />
                      <span className="text-ash text-base leading-relaxed">
                        {item}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
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
