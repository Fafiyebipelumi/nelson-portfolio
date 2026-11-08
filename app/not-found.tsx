import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { IntroHero } from "@/components/intro-hero";
import { HERO_GLOW } from "@/components/glows";
import { ActionButton } from "@/components/action-button";

/* ============================================================================
   404  (redesign system, November 2026)
   ----------------------------------------------------------------------------
   Any unknown URL, and any episode or essay slug that isn't in Sanity. The
   inner-page hero with the two places most people are looking for.
   ========================================================================== */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  const arrow = (
    <ArrowUpRight
      className="size-[1.1rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={2}
      aria-hidden="true"
    />
  );
  return (
    <main id="main">
      <IntroHero
        glow={HERO_GLOW}
        pill="404"
        title="This page isn't here."
        lead={<p>The link may be old, or the page may have moved. These will get you back on track.</p>}
        align="center"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ActionButton href="/" variant="light">
            Home
            {arrow}
          </ActionButton>
          <ActionButton href="/before" variant="dark">
            BEFORE, the podcast
            {arrow}
          </ActionButton>
        </div>
      </IntroHero>
    </main>
  );
}
