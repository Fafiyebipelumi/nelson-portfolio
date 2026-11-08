import { SplashIntro } from "@/components/splash-intro";
import { Hero } from "@/components/hero";
import { BeforePreview } from "@/components/before-preview";
import { StatsStrip } from "@/components/stats-strip";
import { QuoteSection } from "@/components/quote-section";
import { VenturesRow } from "@/components/ventures-row";
import { HiveQuote } from "@/components/hive-quote";
import { CredentialCards } from "@/components/credential-cards";
import { HomeSpeaking } from "@/components/home-speaking";
import { GetInTouch } from "@/components/get-in-touch";
import { getSeasonStatus } from "@/lib/episodes";

/* ============================================================================
   HOMEPAGE  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   A server component composing the sections in Figma order. Header, footer
   and the scroll-reveal observer live in the root layout. Sections are added
   here as each one is rebuilt from the design.
   ========================================================================== */

/* Re-checks Sanity every minute, so the BEFORE band switches from
   "Season one begins January 2027" to the episode buttons on its own once
   episode 01 is released. */
export const revalidate = 60;

export default async function Home() {
  const { live, latest } = await getSeasonStatus();
  return (
    <main id="main">
      <SplashIntro />
      <Hero live={live} />
      <BeforePreview live={live} latest={latest} />
      <StatsStrip />
      <QuoteSection />
      <VenturesRow />
      <HiveQuote />
      <CredentialCards />
      <HomeSpeaking />
      <GetInTouch />
    </main>
  );
}
