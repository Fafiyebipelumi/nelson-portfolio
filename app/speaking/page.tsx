import type { Metadata } from "next";
import { Download } from "lucide-react";
import { speakingPage, type ApplyField } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody } from "@/components/section";
import { Reveal } from "@/components/motion-primitives";
import { EnquiryForm } from "@/components/enquiry-form";

/* ============================================================================
   /speaking  —  signature talks, recent appearances, booking. Brief §7.
   ========================================================================== */

const DESCRIPTION =
  "Nelson T. Ajulo speaks on AI and its distribution, everyday safety technology, building deep tech from Europe, and the next decade of opportunity for emerging markets.";

export const metadata: Metadata = {
  title: "Speaking",
  description: DESCRIPTION,
  alternates: { canonical: "/speaking" },
  openGraph: { type: "website", title: "Speaking · Nelson T. Ajulo", description: DESCRIPTION, url: "/speaking" },
};

/* Booking fields per brief §7 (event name, date, audience, honorarium and
   travel, desired topic), plus contact. */
const bookingFields: ApplyField[] = [
  { name: "name", label: "Your name", type: "text", placeholder: "Full name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@organisation.com", required: true, autoComplete: "email" },
  { name: "event", label: "Event name", type: "text", placeholder: "Conference or event", required: true },
  { name: "date", label: "Date", type: "text", placeholder: "When is it?", required: true },
  { name: "audience", label: "Audience profile", type: "text", placeholder: "Who attends, and how many?", required: false },
  { name: "arrangement", label: "Honorarium and travel arrangement", type: "text", placeholder: "Budget and logistics", required: false },
  { name: "topic", label: "Desired topic", type: "textarea", placeholder: "What would you like Nelson to speak on?", required: true },
];

const speakingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "AIFOD Summer Summit",
  location: {
    "@type": "Place",
    name: "UN Palais des Nations, Geneva",
  },
  startDate: "2026-08",
  performer: { "@type": "Person", name: "Nelson T. Ajulo" },
};

export default function SpeakingPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingJsonLd) }}
      />

      <PageHeader
        eyebrow={speakingPage.eyebrow}
        title={speakingPage.heading}
        lead={speakingPage.lead.body}
      />

      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          {/* Signature talks */}
          <Reveal>
            <h2 className="text-title text-bone mb-12 font-medium">
              {speakingPage.signature.heading}
            </h2>
          </Reveal>

          <div className="border-rule-ink-strong border-t">
            {speakingPage.signature.talks.map((talk, i) => (
              <Reveal key={talk.title} delay={Math.min(i * 0.05, 0.15)}>
                <article className="border-rule-ink grid gap-x-8 gap-y-4 border-b py-9 lg:grid-cols-12">
                  <span className="eyebrow text-signal-bright lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-subtitle text-bone font-medium lg:col-span-6">
                    {talk.title}
                  </h3>
                  <p className="text-ash text-base leading-relaxed lg:col-span-5">
                    {talk.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Recent appearances */}
          <div className="mt-20 sm:mt-28">
            <Reveal>
              <h2 className="text-title text-bone mb-10 font-medium">
                {speakingPage.recent.heading}
              </h2>
            </Reveal>
            <ul className="border-rule-ink border-t">
              {speakingPage.recent.items.map((item) => (
                <Reveal key={item}>
                  <li className="border-rule-ink text-ash border-b py-5 text-lg">
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </SectionBody>
      </Section>

      {/* Booking */}
      <Section id="booking" tone="ink" grain>
        <SectionBody>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-title text-bone font-medium">
                  {speakingPage.booking.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="text-ash mt-8 max-w-md text-base leading-relaxed">
                  {speakingPage.booking.body}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <a
                  href={speakingPage.booking.kit.href}
                  className="group border-rule-ink-strong hover:border-signal-bright text-bone mt-10 inline-flex items-center gap-2 border px-6 py-3.5 text-sm font-medium transition-colors"
                >
                  <Download className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  {speakingPage.booking.kit.label}
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal y={28}>
                <EnquiryForm
                  fields={bookingFields}
                  subject="Speaking enquiry from tnajulo.com"
                  submitLabel="Send enquiry"
                  successTitle="Enquiry received."
                  successBody="Thank you. It has reached the right desk and every enquiry is read."
                />
              </Reveal>
            </div>
          </div>
        </SectionBody>
      </Section>
    </main>
  );
}
