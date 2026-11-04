import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { speaking } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

/* ============================================================================
   08 — SPEAKING / GLOBAL PRESENCE
   ----------------------------------------------------------------------------
   Restrained by instruction and by judgement: no logo wall, no event photos,
   no attendance figures. Topics are set large because the subjects are the
   substance, and a large numbered list reads as a programme rather than a
   feature grid. Each topic carries the one-line question the talk answers.

   The only named engagement is the AIFOD Summer Summit, also described in
   section 07. Nothing is invented here to pad the section out.
   ========================================================================== */

export function Speaking() {
  return (
    <Section tone="ink" grain>
      <SectionBody>
        <SectionLabel index="08" label={speaking.eyebrow} tone="ink" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-title text-charcoal font-5xl">
                {speaking.headline}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-5">
              {speaking.body.map((paragraph, i) => (
                <Reveal key={i} delay={0.06 + i * 0.04}>
                  <p className="text-graphite max-w-md text-base leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="eyebrow text-mute mt-10 mb-2">Recent engagement</p>
              <p className="text-charcoal max-w-md text-base leading-relaxed">
                {speaking.recent}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <Link
                href={speaking.cta.href}
                className="link-draw text-signal hover:text-charcoal group mt-8 inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
              >
                {speaking.cta.label}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-mute mb-6">Speaking topics</p>
            </Reveal>

            <Stagger className="border-rule-strong border-t">
              {speaking.topics.map((topic, i) => (
                <StaggerItem key={topic.title} className="border-rule border-b">
                  <div className="flex items-baseline gap-5 py-5 sm:gap-7">
                    <span className="eyebrow text-signal shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-charcoal text-lg font-medium tracking-[-0.02em] sm:text-xl">
                        {topic.title}
                      </h3>
                      <p className="text-graphite mt-1.5 text-sm leading-relaxed">
                        {topic.body}
                      </p>
                    </div>
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
