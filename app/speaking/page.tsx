import type { Metadata } from "next";
import { speakingPage, type ApplyField } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody, SectionLabel } from "@/components/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { EnquiryForm } from "@/components/enquiry-form";

/* ============================================================================
   /speaking  —  point of view, speaking topics, recent engagement, booking.
   Copy from the October 2026 copy proposal.
   ========================================================================== */

const DESCRIPTION =
  "Nelson T. Ajulo speaks on artificial intelligence, AI sovereignty and access, everyday safety technology, African innovation and venture building. Keynotes, panels, fireside chats and media interviews.";

export const metadata: Metadata = {
  title: { absolute: "Nelson T. Ajulo | AI & Technology Speaker" },
  description: DESCRIPTION,
  alternates: { canonical: "/speaking" },
  openGraph: {
    type: "website",
    title: "Nelson T. Ajulo | AI & Technology Speaker",
    description: DESCRIPTION,
    url: "/speaking",
  },
};

/* Event details plus the formats the proposal names (keynotes, panels,
   fireside chats, media interviews). */
const bookingFields: ApplyField[] = [
  { name: "name", label: "Your name", type: "text", placeholder: "Full name", required: true, autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", placeholder: "you@organisation.com", required: true, autoComplete: "email" },
  { name: "event", label: "Event name", type: "text", placeholder: "Conference or event", required: true },
  {
    name: "format",
    label: "Format",
    type: "select",
    placeholder: "Choose one",
    required: true,
    options: ["Keynote", "Conference panel", "Fireside chat", "Media interview", "Something else"],
  },
  { name: "date", label: "Date", type: "text", placeholder: "When is it?", required: true },
  { name: "audience", label: "Audience profile", type: "text", placeholder: "Who attends, and how many?", required: false },
  { name: "arrangement", label: "Honorarium and travel arrangement", type: "text", placeholder: "Budget and logistics", required: false },
  { name: "topic", label: "Desired topic", type: "textarea", placeholder: "What would you like Nelson to speak on?", required: true },
];

const speakingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "AIFOD Summer Summit",
  location: { "@type": "Place", name: "United Nations Office at Geneva" },
  startDate: "2026-08",
  performer: { "@type": "Person", name: "Nelson T. Ajulo" },
};

export default function SpeakingPage() {
  return (
    <main id="main">
      <JsonLd data={speakingJsonLd} />

      <PageHeader
        eyebrow={speakingPage.eyebrow}
        title={speakingPage.heading}
        lead={speakingPage.intro[0]}
      >
        <div className="mt-6 max-w-2xl space-y-5">
          {speakingPage.intro.slice(1).map((paragraph, i) => (
            <Reveal key={i} delay={0.15 + i * 0.04}>
              <p className="text-ash text-base leading-relaxed sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </PageHeader>

      {/* Speaking topics */}
      <Section tone="ink" grain>
        <SectionBody>
          <SectionLabel index="01" label={speakingPage.topics.heading} tone="ink" asHeading />

          <Stagger className="border-rule-ink-strong border-t">
            {speakingPage.topics.items.map((topic, i) => (
              <StaggerItem key={topic.title} className="border-rule-ink border-b">
                <article className="grid gap-x-8 gap-y-4 py-9 lg:grid-cols-12">
                  <span className="eyebrow text-signal-bright lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-subtitle text-bone font-medium lg:col-span-5">
                    {topic.title}
                  </h3>
                  <p className="text-ash text-base leading-relaxed lg:col-span-6">
                    {topic.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Recent engagement */}
          <div className="mt-20 sm:mt-28">
            <Reveal>
              <p className="eyebrow text-signal-bright mb-6">{speakingPage.recent.heading}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="border-rule-ink grid gap-x-8 gap-y-4 border-t pt-8 lg:grid-cols-12">
                <h3 className="text-subtitle text-bone font-medium lg:col-span-5">
                  {speakingPage.recent.title}
                </h3>
                <p className="text-ash text-base leading-relaxed lg:col-span-6 lg:col-start-7">
                  {speakingPage.recent.body}
                </p>
              </div>
            </Reveal>
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
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal y={28}>
                <EnquiryForm
                  fields={bookingFields}
                  subject="Speaking enquiry from tnajulo.com"
                  submitLabel={speakingPage.booking.submitLabel}
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
