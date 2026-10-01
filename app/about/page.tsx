import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { about } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody } from "@/components/section";
import { Reveal } from "@/components/motion-primitives";

/* ============================================================================
   /about  —  full bio, earlier work, education, recognitions, board roles.
   Copy verbatim from brief §6.
   ========================================================================== */

const DESCRIPTION =
  "Nelson T. Ajulo, PhD, is a technology entrepreneur and investor. CEO and Co-Founder of MyHives, founder of Joble, and General Partner at 15Wins Ventures. AIFOD Global Advocate.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", title: "About Nelson T. Ajulo", description: DESCRIPTION, url: "/about" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nelson T. Ajulo",
  honorificSuffix: "PhD",
  jobTitle: "Entrepreneur, Investor, Technologist",
  url: "https://tnajulo.com/about",
  worksFor: [
    { "@type": "Organization", name: "MyHives" },
    { "@type": "Organization", name: "Joble" },
    { "@type": "Organization", name: "15Wins Ventures" },
  ],
  homeLocation: { "@type": "Place", name: "The Hague, Netherlands" },
};

function DetailList({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <div>
      <h2 className="eyebrow text-signal-bright mb-6">{heading}</h2>
      <ul className="border-rule-ink border-t">
        {items.map((item) => (
          <li
            key={item}
            className="border-rule-ink text-ash border-b py-4 text-base leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd data={personJsonLd} />

      <PageHeader eyebrow={about.eyebrow} title={about.heading} lead={about.intro[0]} />

      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          {/* Standing paragraphs */}
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-7 lg:col-span-8">
              {about.intro.slice(1).map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-ash text-base leading-relaxed sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Earlier work */}
          <div className="mt-20 sm:mt-28">
            <Reveal>
              <h2 className="text-title text-bone mb-10 font-medium">
                {about.earlierWork.heading}
              </h2>
            </Reveal>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-7 lg:col-span-8">
                {about.earlierWork.body.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="text-ash text-base leading-relaxed sm:text-lg">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Detail lists */}
          <div className="mt-20 grid gap-12 sm:mt-28 lg:grid-cols-3 lg:gap-8">
            <Reveal>
              <DetailList heading={about.education.heading} items={about.education.items} />
            </Reveal>
            <Reveal delay={0.05}>
              <DetailList heading={about.recognitions.heading} items={about.recognitions.items} />
            </Reveal>
            <Reveal delay={0.1}>
              <DetailList heading={about.boardAdvisory.heading} items={about.boardAdvisory.items} />
            </Reveal>
          </div>

          {/* Location + CTAs */}
          <Reveal>
            <div className="border-rule-ink mt-20 flex flex-col gap-8 border-t pt-10 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-bone text-lg">{about.location}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={about.cta[0].href}
                  className="group border-rule-ink-strong hover:border-signal-bright text-bone inline-flex items-center gap-2 border px-6 py-3.5 text-sm font-medium transition-colors"
                >
                  <Download className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  {about.cta[0].label}
                </a>
                <Link
                  href={about.cta[1].href}
                  className="group bg-signal-bright text-ink hover:bg-signal inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors"
                >
                  {about.cta[1].label}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </SectionBody>
      </Section>
    </main>
  );
}
