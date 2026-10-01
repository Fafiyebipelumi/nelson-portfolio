import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import type { Fact } from "@/lib/content";
import { PageHeader } from "./page-header";
import { Section, SectionBody } from "./section";
import { Reveal } from "./motion-primitives";
import { JsonLd } from "./json-ld";

/* ============================================================================
   COMPANY PAGE
   ----------------------------------------------------------------------------
   Shared anchor-page layout for /myhives, /joble, /15wins (brief §10): hero
   statement, description, stat row, optional quote, and a link out to the
   company's own site. Content comes verbatim from the homepage venture copy
   plus one verified partnerships/traction paragraph.
   ========================================================================== */

export interface CompanyPageData {
  wordmark: string;
  kicker?: string;
  headline: string;
  body: readonly string[];
  facts: readonly Fact[];
  quote?: { text: string; attribution: string };
  href: string;
  siteLabel: string;
}

export function companyMetadata(data: CompanyPageData, path: string): Metadata {
  const description = `${data.wordmark}. ${data.headline} ${data.body[0]}`.slice(0, 200);
  return {
    title: data.wordmark,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", title: data.wordmark, description, url: path },
  };
}

export function CompanyPage({ data }: { data: CompanyPageData }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.wordmark,
    url: data.href,
    description: data.headline,
    founder: { "@type": "Person", name: "Nelson T. Ajulo" },
  };

  return (
    <main id="main">
      <JsonLd data={orgJsonLd} />
      <PageHeader
        eyebrow={data.kicker ?? "Company"}
        title={data.wordmark}
        lead={data.headline}
      />

      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Description */}
            <div className="space-y-7 lg:col-span-7">
              {data.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p
                    className={
                      i === 0
                        ? "text-lead text-bone"
                        : "text-ash text-base leading-relaxed sm:text-lg"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Stat row + link out */}
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <dl className="border-rule-ink border-t">
                {data.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-rule-ink flex items-baseline justify-between gap-6 border-b py-3.5"
                  >
                    <dt className="eyebrow text-slate">{fact.label}</dt>
                    <dd className="text-bone text-right text-sm">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={data.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw text-signal-bright hover:text-bone group mt-7 inline-flex items-baseline gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
              >
                {data.siteLabel}
                <ArrowUpRight
                  className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>

          {/* Quote */}
          {data.quote ? (
            <Reveal className="mt-20 sm:mt-28">
              <figure className="border-signal-bright/50 max-w-4xl border-l pl-6 sm:pl-10">
                <blockquote>
                  <p className="text-subtitle text-bone font-serif">
                    &ldquo;{data.quote.text}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="eyebrow text-slate mt-5">
                  {data.quote.attribution}
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </SectionBody>
      </Section>
    </main>
  );
}
