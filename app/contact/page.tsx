import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactPage } from "@/lib/content";
import { PageHeader } from "@/components/page-header";
import { Section, SectionBody } from "@/components/section";
import { Stagger, StaggerItem } from "@/components/motion-primitives";

/* ============================================================================
   /contact  —  routed by enquiry type. Brief §9. Mailboxes confirmed to exist;
   speaking and guest enquiries route to on-site forms.
   ========================================================================== */

const DESCRIPTION =
  "Reach Nelson T. Ajulo. Enquiries routed by type: partnerships, Joble, 15Wins, speaking, press, podcast guests, and general.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", title: "Contact · Nelson T. Ajulo", description: DESCRIPTION, url: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow={contactPage.eyebrow}
        title={contactPage.heading}
        lead={contactPage.intro}
      />

      <Section tone="ink" grain>
        <SectionBody className="!pt-0">
          <Stagger className="border-rule-ink-strong border-t">
            {contactPage.routes.map((route) => {
              const internal = route.href.startsWith("/");
              const inner = (
                <>
                  <span className="text-ash lg:col-span-7 text-base sm:text-lg">
                    {route.label}
                  </span>
                  <span className="text-bone group-hover:text-signal-bright lg:col-span-5 flex items-center gap-2 text-lg font-medium tracking-[-0.01em] transition-colors lg:justify-end">
                    {route.value}
                    <ArrowUpRight
                      className="size-4 shrink-0 opacity-60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                </>
              );
              const className =
                "group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 py-6 lg:grid-cols-12";

              return (
                <StaggerItem key={route.label} className="border-rule-ink border-b">
                  {internal ? (
                    <Link href={route.href} className={className}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={route.href} className={className}>
                      {inner}
                    </a>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </SectionBody>
      </Section>
    </main>
  );
}
