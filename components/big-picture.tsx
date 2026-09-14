import { bigPicture } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

/* ============================================================================
   06 — AI, AFRICA & THE BIGGER PICTURE
   ----------------------------------------------------------------------------
   Establishes that the work is not only commercial.

   Accuracy note: Nelson's involvement is described strictly as participation.
   The AIFOD summit details (UN Office at Geneva, delegates from 100+
   countries, the theme "Small Takes the Lead") are the forum's own published
   facts and are attributed to the forum, not to him. No speaking slot, panel
   position, keynote or appointment is claimed anywhere in this section.
   ========================================================================== */

export function BigPicture() {
  return (
    <Section id="perspective" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="06" label={bigPicture.eyebrow} tone="ink" />

        <Reveal>
          <h2 className="text-display text-bone max-w-5xl font-medium">
            {bigPicture.headline.before}
            <span className="text-signal-bright font-serif italic">
              {bigPicture.headline.emphasis}
            </span>
            {bigPicture.headline.after}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-6">
            {bigPicture.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={
                    i === 0
                      ? "text-lead text-bone"
                      : "text-ash text-base leading-relaxed sm:text-[1.0625rem]"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Themes — plain text, hairline separated. No icons: eight small
              glyphs here would read as a feature grid, which is the opposite
              of the intent. */}
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="eyebrow text-slate mb-5">Working themes</p>
            <ul className="border-rule-ink grid grid-cols-1 border-t sm:grid-cols-2 lg:grid-cols-1">
              {bigPicture.themes.map((theme) => (
                <li
                  key={theme}
                  className="border-rule-ink text-ash border-b py-2.5 text-sm"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Engagements */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
          <Reveal>
            <p className="eyebrow text-slate mb-8">In the conversation</p>
          </Reveal>

          <Stagger className="border-rule-ink-strong border-t">
            {bigPicture.engagements.map((item) => (
              <StaggerItem key={item.name} className="border-rule-ink border-b">
                <div className="grid gap-x-8 gap-y-3 py-7 sm:py-9 lg:grid-cols-12 lg:items-baseline">
                  <p className="eyebrow text-signal-bright lg:col-span-2">
                    {item.role}
                  </p>
                  <h3 className="text-bone text-xl font-medium tracking-[-0.02em] lg:col-span-4 sm:text-2xl">
                    {item.name}
                  </h3>
                  <div className="lg:col-span-6">
                    <p className="text-ash text-sm">{item.place}</p>
                    <p className="text-slate mt-2 max-w-xl text-sm leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </SectionBody>
    </Section>
  );
}
