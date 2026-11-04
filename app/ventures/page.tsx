import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ventures, venturesPage } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody, SectionLabel } from "@/components/section";
import { Reveal } from "@/components/motion-primitives";

/* ============================================================================
   /ventures  —  MyHives / BEEKON, Joble and 15Wins Ventures on one page.
   ----------------------------------------------------------------------------
   Replaces the three separate company pages (copy proposal, October 2026).
   Each venture section carries an id so the old /myhives, /joble and /15wins
   URLs redirect straight to it (see next.config.ts). Each links out to the
   company's own site, which is where the product detail lives.
   ========================================================================== */

const DESCRIPTION =
  "Nelson T. Ajulo's ventures: MyHives and BEEKON for everyday safety, Joble's AI agents for small businesses, and 15Wins Ventures for venture building and early-stage investment.";

export const metadata: Metadata = {
  title: { absolute: "Nelson T. Ajulo | AI Ventures & Early-Stage Investment" },
  description: DESCRIPTION,
  alternates: { canonical: "/ventures" },
  openGraph: {
    type: "website",
    title: "Nelson T. Ajulo | AI Ventures & Early-Stage Investment",
    description: DESCRIPTION,
    url: "/ventures",
  },
};

const venturesJsonLd = {
  "@context": "https://schema.org",
  "@graph": ventures.map((venture) => ({
    "@type": "Organization",
    name: venture.wordmark,
    url: venture.href,
    description: venture.page.headline,
    founder: { "@type": "Person", name: "Nelson T. Ajulo" },
  })),
};

export default function VenturesPage() {
  return (
    <main id="main">
      <JsonLd data={venturesJsonLd} />

      <PageHeader
        eyebrow={venturesPage.eyebrow}
        title={venturesPage.heading}
        lead={venturesPage.intro[0]}
      >
        <Reveal delay={0.15}>
          <p className="text-ash mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {venturesPage.intro[1]}
          </p>
        </Reveal>
      </PageHeader>

      {ventures.map((venture, i) => (
        <Section key={venture.id} id={venture.id} tone="ink" grain>
          <SectionBody>
            <SectionLabel
              index={String(i + 1).padStart(2, "0")}
              label={venture.kicker}
              tone="ink"
            />

            <Reveal>
              <h2 className="text-bone text-2xl font-medium tracking-[0.02em] uppercase sm:text-3xl">
                {venture.wordmark}
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="text-title text-bone mt-8 max-w-4xl font-medium sm:mt-10">
                {venture.page.headline}
              </p>
            </Reveal>

            <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-8">
              <div className="space-y-6 lg:col-span-7">
                {venture.page.body.map((paragraph, p) => (
                  <Reveal key={p} delay={p * 0.05}>
                    <p
                      className={
                        p === 0
                          ? "text-lead text-bone"
                          : "text-ash text-base leading-relaxed sm:text-lg"
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

                <a
                  href={venture.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-signal-bright text-ink hover:bg-bone mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-300"
                >
                  {venture.page.cta}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
                <p className="eyebrow text-slate mt-4">{venture.siteLabel}</p>
              </Reveal>
            </div>
          </SectionBody>
        </Section>
      ))}

      {/* Close */}
      <Section tone="ink" grain>
        <SectionBody rhythm="compact">
          <Reveal>
            <h2 className="text-title text-bone max-w-3xl font-medium">
              {venturesPage.close.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-ash mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
              {venturesPage.close.body}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={venturesPage.close.cta.href}
              className="group border-rule-ink-strong hover:border-signal-bright text-bone mt-10 inline-flex items-center gap-2 border px-6 py-3.5 text-sm font-medium transition-colors"
            >
              {venturesPage.close.cta.label}
              <ArrowUpRight
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </SectionBody>
      </Section>
    </main>
  );
}
