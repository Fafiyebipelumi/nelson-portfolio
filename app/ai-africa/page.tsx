import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aiAfrica } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody, SectionLabel } from "@/components/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

/* ============================================================================
   /ai-africa  —  AI, Africa and the bigger picture.
   ----------------------------------------------------------------------------
   The full version of homepage section 06, promoted to its own page by the
   copy proposal (October 2026). Point of view, the four questions Nelson is
   working on, and how they connect to the businesses he builds.
   ========================================================================== */

const DESCRIPTION =
  "Nelson T. Ajulo on AI in Africa, AI sovereignty and access: who can use AI, who owns the infrastructure, and who captures the value it creates.";

export const metadata: Metadata = {
  title: { absolute: "Nelson T. Ajulo on AI in Africa & AI Sovereignty" },
  description: DESCRIPTION,
  alternates: { canonical: "/ai-africa" },
  openGraph: {
    type: "article",
    title: "Nelson T. Ajulo on AI in Africa & AI Sovereignty",
    description: DESCRIPTION,
    url: "/ai-africa",
  },
};

export default function AiAfricaPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow={aiAfrica.eyebrow}
        title={aiAfrica.heading}
        lead={aiAfrica.lead}
      />

      {/* Argument */}
      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-7 lg:col-span-8">
              {aiAfrica.body.map((paragraph, i) => (
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
          </div>
        </SectionBody>
      </Section>

      {/* The questions */}
      <Section tone="ink" grain>
        <SectionBody>
          <SectionLabel index="01" label={aiAfrica.questions.heading} tone="ink" asHeading />

          <Stagger className="border-rule-ink-strong grid border-t sm:grid-cols-2">
            {aiAfrica.questions.items.map((item, i) => (
              <StaggerItem
                key={item.title}
                className={`border-rule-ink border-b py-9 sm:py-11 ${
                  i % 2 === 0 ? "sm:border-rule-ink sm:border-r sm:pr-12" : "sm:pl-12"
                }`}
              >
                <h3 className="text-subtitle text-bone font-medium">{item.title}</h3>
                <p className="text-ash mt-4 max-w-md text-base leading-relaxed sm:text-[1.0625rem]">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </SectionBody>
      </Section>

      {/* From ideas to practical work */}
      <Section tone="ink" grain>
        <SectionBody rhythm="compact">
          <SectionLabel index="02" label={aiAfrica.practice.heading} tone="ink" asHeading />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-7 lg:col-span-8">
              {aiAfrica.practice.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p
                    className={
                      i === aiAfrica.practice.body.length - 1
                        ? "text-subtitle text-bone"
                        : "text-ash text-base leading-relaxed sm:text-lg"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.12}>
                <Link
                  href={aiAfrica.cta.href}
                  className="group border-rule-ink-strong hover:border-signal-bright text-bone mt-4 inline-flex items-center gap-2 border px-6 py-3.5 text-sm font-medium transition-colors"
                >
                  {aiAfrica.cta.label}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            </div>
          </div>
        </SectionBody>
      </Section>
    </main>
  );
}
