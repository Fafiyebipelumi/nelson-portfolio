import { journey } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   05 — THE JOURNEY
   ----------------------------------------------------------------------------
   An arc, not a résumé. Each chapter gets one line of consequence and nothing
   more, and the design does the editorialising: live chapters are set in full
   charcoal with a filled marker, concluded ones recede to grey with a hollow
   one. You can read which parts of the story are still running without
   parsing a single date.

   Dates appear only where a public source supports them. Chapters without a
   verifiable date carry a qualitative label instead of an invented year —
   which is why Zarttech reads "Concluded 2025" and early work reads only
   "Nigeria · Netherlands".
   ========================================================================== */

export function Journey() {
  return (
    <Section id="journey" tone="deep">
      <SectionBody>
        <SectionLabel index="05" label="The journey" />

        <Reveal>
          <h2 className="text-title text-charcoal mb-16 max-w-3xl font-medium sm:mb-20">
            Access, then opportunity, then{" "}
            <span className="text-signal font-serif italic">
              intelligence and safety
            </span>
            .
          </h2>
        </Reveal>

        <ol className="border-rule-strong relative border-t">
          {/* Spine linking the markers. */}
          <span
            aria-hidden="true"
            className="bg-rule absolute top-0 bottom-0 left-[3px] hidden w-px lg:block"
          />

          {journey.map((chapter, i) => {
            const active = chapter.status === "active";

            return (
              <li key={chapter.index} className="border-rule border-b">
                <Reveal delay={Math.min(i * 0.05, 0.2)} y={16}>
                  <div className="relative grid gap-x-8 gap-y-4 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline">
                    {/* Marker + index */}
                    <div className="flex items-center gap-4 lg:col-span-2">
                      <span
                        aria-hidden="true"
                        className={`size-[7px] shrink-0 rounded-full ${
                          active
                            ? "bg-signal"
                            : "border-rule-strong bg-paper-deep border"
                        }`}
                      />
                      <span
                        className={`eyebrow ${active ? "text-signal" : "text-mute"}`}
                      >
                        {chapter.index}
                      </span>
                    </div>

                    {/* Name */}
                    <h3
                      className={`text-subtitle font-medium lg:col-span-4 ${
                        active ? "text-charcoal" : "text-mute"
                      }`}
                    >
                      {chapter.name}
                    </h3>

                    {/* Consequence */}
                    <p
                      className={`max-w-lg text-base leading-relaxed lg:col-span-4 ${
                        active ? "text-graphite" : "text-mute"
                      }`}
                    >
                      {chapter.body}
                    </p>

                    {/* Standing */}
                    <p
                      className={`eyebrow lg:col-span-2 lg:text-right ${
                        active ? "text-graphite" : "text-mute"
                      }`}
                    >
                      {chapter.meta}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Legend — makes the visual grammar explicit rather than implied. */}
        <Reveal>
          <div className="text-mute mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="bg-signal size-[7px] rounded-full"
              />
              <span className="eyebrow">Active</span>
            </span>
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="border-rule-strong bg-paper-deep size-[7px] rounded-full border"
              />
              <span className="eyebrow">Previous chapter</span>
            </span>
          </div>
        </Reveal>
      </SectionBody>
    </Section>
  );
}
