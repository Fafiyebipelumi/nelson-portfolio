import { previousChapters } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   09 — PREVIOUS CHAPTERS
   ----------------------------------------------------------------------------
   Deliberately the quietest section on the page: smaller type, muted, no
   imagery, no link. It is not promotion for a company that no longer trades.

   Zarttech's standing is stated plainly — role concluded 2025, company no
   longer operating — and given a "what it taught" line, which is the only
   reason a closed venture belongs on a personal site at all. This is the
   section that makes the rest of the page credible.
   ========================================================================== */

export function PreviousChapters() {
  return (
    <Section tone="paper">
      <SectionBody rhythm="compact">
        <SectionLabel index="09" label={previousChapters.eyebrow} />

        <Reveal>
          <h2 className="text-subtitle text-graphite mb-14 max-w-2xl font-normal sm:mb-16">
            {previousChapters.headline}
          </h2>
        </Reveal>

        {previousChapters.entries.map((entry) => (
          <Reveal key={entry.name}>
            <article className="border-rule grid gap-x-8 gap-y-6 border-t pt-9 lg:grid-cols-12">
              <header className="lg:col-span-3">
                <h3 className="text-mute text-xl font-medium tracking-[0.02em] uppercase">
                  {entry.name}
                </h3>
                <p className="eyebrow text-mute mt-3">{entry.meta}</p>
              </header>

              <div className="lg:col-span-5">
                <p className="text-graphite text-base leading-relaxed">
                  {entry.body}
                </p>
              </div>

              <div className="lg:col-span-4">
                <p className="eyebrow text-signal mb-3">What it taught</p>
                <p className="text-graphite text-sm leading-relaxed">
                  {entry.learned}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </SectionBody>
    </Section>
  );
}
