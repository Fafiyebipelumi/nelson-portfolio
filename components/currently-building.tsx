import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { currentlyBuilding, ventures } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   03 — CURRENTLY BUILDING
   ----------------------------------------------------------------------------
   Three editorial case studies rather than a card grid, set as a turning
   sequence of ink sections. The first carries the section headline; each
   venture then gets its wordmark, a headline, two paragraphs, a short fact
   list and a link into its section on /ventures, which in turn links out to
   the company's own site.

   Zarttech does not appear here: it is a concluded chapter (the journey and
   About), never presented as a current venture.
   ========================================================================== */

export function CurrentlyBuilding() {
  return (
    <>
      {ventures.map((venture, i) => (
        <Section
          key={venture.id}
          id={i === 0 ? "building" : undefined}
          tone="ink"
          grain
          seam={false}
        >
          <SectionBody>
            <SectionLabel
              index="03"
              label={`${currentlyBuilding.eyebrow} · ${String(i + 1).padStart(2, "0")}/${String(ventures.length).padStart(2, "0")}`}
              tone="ink"
            />

            {i === 0 ? (
              <Reveal>
                <h2 className="text-display text-bone mb-20 max-w-4xl font-medium sm:mb-24 lg:mb-32">
                  {currentlyBuilding.headline}
                </h2>
              </Reveal>
            ) : null}

            {/* Masthead */}
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <h3 className="text-bone text-2xl font-medium tracking-[0.02em] uppercase sm:text-3xl">
                  {venture.wordmark}
                </h3>
                <p className="eyebrow text-signal-bright">{venture.kicker}</p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="text-title text-bone mt-8 max-w-4xl font-medium sm:mt-10">
                {venture.home.headline}
              </p>
            </Reveal>

            {/* Body + facts */}
            <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-8">
              <div className="space-y-6 lg:col-span-6">
                {venture.home.body.map((paragraph, p) => (
                  <Reveal key={p} delay={p * 0.06}>
                    <p
                      className={
                        p === 0
                          ? "text-lead text-bone"
                          : "text-ash text-base leading-relaxed sm:text-[1.0625rem]"
                      }
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
                <dl className="border-rule-ink border-t">
                  {[
                    { label: "Role", value: venture.role },
                    { label: "Focus", value: venture.focus },
                  ].map((fact) => (
                    <div
                      key={fact.label}
                      className="border-rule-ink flex items-baseline justify-between gap-6 border-b py-3.5"
                    >
                      <dt className="eyebrow text-slate shrink-0">{fact.label}</dt>
                      <dd className="text-bone text-right text-sm">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href={`/ventures#${venture.id}`}
                  className="link-draw group text-signal-bright hover:text-bone mt-7 inline-flex items-baseline gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
                >
                  {venture.home.cta}
                  <ArrowUpRight
                    className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            </div>
          </SectionBody>
        </Section>
      ))}
    </>
  );
}
