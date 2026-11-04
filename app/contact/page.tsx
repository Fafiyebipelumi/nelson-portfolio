import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactPage } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody, SectionLabel } from "@/components/section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";
import { EnquiryForm } from "@/components/enquiry-form";

/* ============================================================================
   /contact  —  four routes by enquiry type, then a single enquiry form.
   ----------------------------------------------------------------------------
   Per the October 2026 copy proposal. Business enquiries scroll to the form
   on this page; speaking and podcast route to their own forms; press is a
   direct mailbox. Press now lives here (the old /press page redirects here).
   ========================================================================== */

const DESCRIPTION =
  "Contact Nelson T. Ajulo about building or backing a company, speaking invitations, press and media requests, or the What Comes Next podcast.";

export const metadata: Metadata = {
  title: { absolute: "Contact Nelson T. Ajulo | Business & Speaking" },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact Nelson T. Ajulo | Business & Speaking",
    description: DESCRIPTION,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow={contactPage.eyebrow}
        title={contactPage.heading}
        lead={contactPage.intro[0]}
      >
        <Reveal delay={0.15}>
          <p className="text-ash mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {contactPage.intro[1]}
          </p>
        </Reveal>
      </PageHeader>

      {/* Routes */}
      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          <Stagger className="border-rule-ink-strong grid border-t sm:grid-cols-2">
            {contactPage.routes.map((route, i) => {
              const internal = route.href.startsWith("/") || route.href.startsWith("#");
              const linkClass =
                "link-draw group text-signal-bright hover:text-bone mt-6 inline-flex items-baseline gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors";
              const arrow = (
                <ArrowUpRight
                  className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              );

              return (
                <StaggerItem
                  key={route.label}
                  className={`border-rule-ink border-b py-9 sm:py-11 ${
                    i % 2 === 0 ? "sm:border-rule-ink sm:border-r sm:pr-12" : "sm:pl-12"
                  }`}
                >
                  <h2 className="text-subtitle text-bone font-medium">{route.label}</h2>
                  <p className="text-ash mt-4 max-w-md text-base leading-relaxed">
                    {route.body}
                  </p>
                  {internal ? (
                    <Link href={route.href} className={linkClass}>
                      {route.cta}
                      {arrow}
                    </Link>
                  ) : (
                    <a href={route.href} className={linkClass}>
                      {route.cta}
                      {arrow}
                    </a>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </SectionBody>
      </Section>

      {/* Enquiry form */}
      <Section id="enquiry" tone="ink" grain>
        <SectionBody>
          <SectionLabel index="01" label={contactPage.form.heading} tone="ink" asHeading />
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal y={28}>
                <EnquiryForm
                  fields={contactPage.form.fields}
                  subject="Enquiry from tnajulo.com"
                  submitLabel={contactPage.form.submitLabel}
                  successTitle="Enquiry received."
                  successBody="Thank you. It has reached the right desk and every enquiry is read."
                  note={contactPage.form.privacy}
                />
              </Reveal>
            </div>
          </div>
        </SectionBody>
      </Section>
    </main>
  );
}
