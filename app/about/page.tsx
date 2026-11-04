import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { about } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody, SectionLabel } from "@/components/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

/* ============================================================================
   /about  —  intro, the story, earlier work, education, recognition.
   Copy from the October 2026 copy proposal, in Nelson's first person (the
   two-paragraph intro stays in the third person, as the proposal sets it).
   ========================================================================== */

const DESCRIPTION =
  "Nelson T. Ajulo is a technology entrepreneur and investor working across artificial intelligence, everyday safety and venture building. CEO and Co-Founder of MyHives, founder of Joble, and General Partner at 15Wins Ventures.";

export const metadata: Metadata = {
  title: { absolute: "About Nelson T. Ajulo | Founder & AI Entrepreneur" },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: "About Nelson T. Ajulo | Founder & AI Entrepreneur",
    description: DESCRIPTION,
    url: "/about",
  },
};

/* ProfilePage wrapping a Person, as the proposal's SEO sheet suggests. */
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://tnajulo.com/about",
  mainEntity: {
    "@type": "Person",
    name: "Nelson T. Ajulo",
    honorificSuffix: "PhD",
    jobTitle: "Technology entrepreneur and investor",
    url: "https://tnajulo.com",
    worksFor: [
      { "@type": "Organization", name: "MyHives" },
      { "@type": "Organization", name: "Joble" },
      { "@type": "Organization", name: "15Wins Ventures" },
    ],
    homeLocation: { "@type": "Place", name: "The Hague, Netherlands" },
  },
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
      <JsonLd data={profileJsonLd} />

      <PageHeader eyebrow={about.eyebrow} title={about.heading} lead={about.intro[0]}>
        <Reveal delay={0.15}>
          <p className="text-ash mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {about.intro[1]}
          </p>
        </Reveal>
      </PageHeader>

      {/* The story */}
      <Section tone="ink" grain>
        <SectionBody>
          <SectionLabel index="01" label={about.story.heading} tone="ink" asHeading />
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-7 lg:col-span-8">
              {about.story.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p
                    className={
                      i === about.story.body.length - 1
                        ? "text-subtitle text-bone"
                        : "text-ash text-base leading-relaxed sm:text-lg"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </SectionBody>
      </Section>

      {/* Earlier work */}
      <Section tone="ink" grain>
        <SectionBody>
          <SectionLabel index="02" label={about.earlierWork.heading} tone="ink" asHeading />
          <Stagger className="border-rule-ink-strong border-t">
            {about.earlierWork.items.map((item) => (
              <StaggerItem key={item.name} className="border-rule-ink border-b">
                <article className="grid gap-x-8 gap-y-3 py-9 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <h3 className="text-subtitle text-bone font-medium">{item.name}</h3>
                    {item.tagline ? (
                      <p className="eyebrow text-signal-bright mt-3">{item.tagline}</p>
                    ) : null}
                  </div>
                  <p className="text-ash text-base leading-relaxed sm:text-lg lg:col-span-7 lg:col-start-6">
                    {item.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Education + recognition */}
          <div className="mt-20 grid gap-12 sm:mt-28 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <DetailList heading={about.education.heading} items={about.education.items} />
            </Reveal>
            <Reveal delay={0.05}>
              <DetailList heading={about.recognition.heading} items={about.recognition.items} />
            </Reveal>
          </div>
        </SectionBody>
      </Section>

      {/* Close */}
      <Section tone="ink" grain>
        <SectionBody rhythm="compact">
          <Reveal>
            <h2 className="text-title text-bone max-w-3xl font-medium">{about.cta.heading}</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-ash mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
              {about.cta.body}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={about.cta.href}
              className="group bg-signal-bright text-ink hover:bg-bone mt-10 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors"
            >
              {about.cta.label}
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
