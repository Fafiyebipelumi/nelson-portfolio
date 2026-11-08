import type { Metadata } from "next";
import { ventures, venturesPage } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { IntroHero } from "@/components/intro-hero";
import { HERO_GLOW } from "@/components/glows";
import { VenturesRow } from "@/components/ventures-row";
import { CloseBand } from "@/components/close-band";

/* ============================================================================
   /ventures  —  MyHives / BEEKON, Joble and 15Wins Ventures on one page.
   ----------------------------------------------------------------------------
   Redesign system (November 2026). Each venture now has its own page and
   the nav's Ventures item only opens the list, so this is the overview for
   anyone who lands here from an old link: the intro, the homepage's
   three-column ventures row (each card leads to its venture page) and a
   cream close with the partnerships desk.
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
  const C = venturesPage.close;
  return (
    <main id="main">
      <JsonLd data={venturesJsonLd} />

      <IntroHero
        glow={HERO_GLOW}
        pill={venturesPage.eyebrow}
        title={venturesPage.heading}
        lead={
          <div className="space-y-4">
            {venturesPage.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        }
      />

      <VenturesRow toPages />

      <CloseBand
        heading={C.heading}
        body={C.body}
        cta={{ label: C.cta.label, href: "/contact?desk=partnerships#enquiry" }}
      />
    </main>
  );
}
