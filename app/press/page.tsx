import type { Metadata } from "next";
import { PressHero } from "@/components/press/press-hero";
import { PressBio } from "@/components/press/press-bio";
import { PressStandardBio } from "@/components/press/press-standard-bio";
import { HiveQuote } from "@/components/hive-quote";
import { PressBoilerplates } from "@/components/press/press-boilerplates";
import { PressStats } from "@/components/press/press-stats";
import { PressContact } from "@/components/press/press-contact";

/* ============================================================================
   /press  —  PRESS  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Everything a producer or journalist needs, ready to copy: short, medium and
   standard bios, the hive quote, company boilerplates, the figures and the
   media contact. Every text block has a Copy button. Header and footer come
   from the root layout.
   ========================================================================== */

const TITLE = "Press | Nelson T. Ajulo";
const DESCRIPTION =
  "Bios, company boilerplates, figures and the media contact for Nelson T. Ajulo, Co-Founder, CEO and CTO of MyHives, founder of Joble, General Partner at 15Wins Ventures and host of BEFORE.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/press" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/press",
  },
};

export default function PressPage() {
  return (
    <main id="main">
      <PressHero />
      <PressBio />
      <PressStandardBio />
      <HiveQuote />
      <PressBoilerplates />
      <PressStats />
      <PressContact />
    </main>
  );
}
