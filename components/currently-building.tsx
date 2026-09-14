import { ArrowUpRight } from "lucide-react";
import { joble, myhives, type Fact } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";
import { SignalChain } from "./signal-chain";

/* ============================================================================
   03 — CURRENTLY BUILDING
   ----------------------------------------------------------------------------
   Two editorial case studies rather than a card grid. They are set as
   deliberate opposites — MyHives on ink, Joble on paper — so the page turns
   between them and the pairing does argumentative work before section 04
   states it outright.

   Only MyHives and Joble appear here. Zarttech does not: it is a concluded
   chapter and lives in section 09.
   ========================================================================== */

function FactList({ facts, tone }: { facts: readonly Fact[]; tone: "ink" | "paper" }) {
  const onInk = tone === "ink";

  return (
    <dl className={`border-t ${onInk ? "border-rule-ink" : "border-rule"}`}>
      {facts.map((fact) => (
        <div
          key={fact.label}
          className={`flex items-baseline justify-between gap-6 border-b py-3.5 ${
            onInk ? "border-rule-ink" : "border-rule"
          }`}
        >
          <dt className={`eyebrow ${onInk ? "text-slate" : "text-mute"}`}>
            {fact.label}
          </dt>
          <dd
            className={`text-right text-sm ${onInk ? "text-bone" : "text-charcoal"}`}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function VisitLink({
  href,
  label,
  tone,
}: {
  href: string;
  label: string;
  tone: "ink" | "paper";
}) {
  const onInk = tone === "ink";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-draw group inline-flex items-baseline gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors ${
        onInk
          ? "text-signal-bright hover:text-bone"
          : "text-signal hover:text-charcoal"
      }`}
    >
      {label}
      <ArrowUpRight
        className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </a>
  );
}

/* -------------------------------------------------------------------------- */

function MyHivesFeature() {
  return (
    <Section id="building" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="03" label="Currently building · 01/02" tone="ink" />

        {/* Masthead */}
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {/* The venture names the section, so it takes the h2 even though
                the headline below is set larger. Visual weight and document
                outline are allowed to disagree. */}
            <h2 className="text-bone text-2xl font-medium tracking-[0.02em] uppercase sm:text-3xl">
              {myhives.wordmark}
            </h2>
            <p className="eyebrow text-signal-bright">{myhives.kicker}</p>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.05}>
          <h3 className="text-title text-bone mt-8 max-w-4xl font-medium sm:mt-10">
            {myhives.headline}
          </h3>
        </Reveal>

        {/* Body + facts */}
        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-6">
            {myhives.body.map((paragraph, i) => (
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

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <FactList facts={myhives.facts} tone="ink" />
            <div className="mt-7">
              <VisitLink href={myhives.href} label="myhives.nl" tone="ink" />
            </div>
          </Reveal>
        </div>

        {/* Pull quote — verbatim and attributed. */}
        <Reveal className="mt-20 sm:mt-24 lg:mt-32">
          <figure className="border-signal-bright/50 max-w-4xl border-l pl-6 sm:pl-10">
            <blockquote>
              <p className="text-subtitle text-bone font-serif">
                “{myhives.quote.text}”
              </p>
            </blockquote>
            <figcaption className="eyebrow text-slate mt-5">
              {myhives.quote.attribution}
            </figcaption>
          </figure>
        </Reveal>

        {/* How it works */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
          <Reveal>
            <p className="eyebrow text-slate mb-9 sm:mb-11">
              How it works
            </p>
          </Reveal>
          <SignalChain />
        </div>

        {/* BEEKON+ hardware */}
        {/* <Reveal className="mt-16 sm:mt-20 lg:mt-28">
          <div className="bg-ink-raised border-rule-ink grid gap-6 border p-7 sm:p-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-3">
              <h4 className="text-bone text-xl font-medium tracking-[0.02em] uppercase">
                {myhives.hardware.name}
              </h4>
              <p className="eyebrow text-signal-bright mt-3">Hardware</p>
            </div>
            <div className="lg:col-span-6">
              <p className="text-ash text-base leading-relaxed">
                {myhives.hardware.body}
              </p>
            </div>
            <div className="lg:col-span-3">
              <p className="text-slate text-sm leading-relaxed">
                {myhives.hardware.status}
              </p>
            </div>
          </div>
        </Reveal> */}
      </SectionBody>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

function JobleFeature() {
  return (
    <Section tone="paper">
      <SectionBody>
        <SectionLabel index="03" label="Currently building · 02/02" />

        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="text-charcoal text-2xl font-medium tracking-[0.02em] uppercase sm:text-3xl">
              {joble.wordmark}
            </h2>
            <p className="eyebrow text-signal">{joble.kicker}</p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h3 className="text-title text-charcoal mt-8 max-w-4xl font-medium sm:mt-10">
            {joble.headline}
          </h3>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-6">
            {joble.body.map((paragraph, i) => (
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

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <FactList facts={joble.facts} tone="paper" />
            <div className="mt-7">
              <VisitLink href={joble.href} label="joble.app" tone="paper" />
            </div>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

export function CurrentlyBuilding() {
  return (
    <>
      <MyHivesFeature />
      <JobleFeature />
    </>
  );
}
