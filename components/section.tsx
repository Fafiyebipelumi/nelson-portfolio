/* ============================================================================
   SECTION SHELL
   ----------------------------------------------------------------------------
   Server components. These carry the page's vertical rhythm and the
   paper/ink alternation so individual sections don't each reinvent spacing.

   `tone="ink"` also applies the `.on-ink` class, which retargets the global
   focus ring to the bright accent for contrast on dark surfaces.
   ========================================================================== */

import type { ReactNode } from "react";
import { DrawRule } from "./motion-primitives";

type Tone = "paper" | "deep" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-charcoal",
  deep: "bg-paper-deep text-charcoal",
  ink: "on-ink bg-ink text-bone",
};

export function Section({
  id,
  tone = "paper",
  children,
  className = "",
  grain = false,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Adds the paper-tooth texture. Reserved for ink surfaces. */
  grain?: boolean;
}) {
  return (
    <section
      id={id}
      /* `data-tone` lets the fixed header work out which surface it is
         currently floating over and invert itself to match. */
      data-tone={tone === "ink" ? "ink" : "paper"}
      className={`relative isolate ${toneClass[tone]} ${className}`}
      /* Offsets the fixed header for anchor navigation. */
      style={{ scrollMarginTop: "5rem" }}
    >
      {grain ? <div aria-hidden="true" className="grain-layer z-0" /> : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/** Standard section padding. Mobile gets its own, tighter rhythm. */
export function SectionBody({
  children,
  className = "",
  rhythm = "default",
}: {
  children: ReactNode;
  className?: string;
  /** `compact` is for subordinate sections that should not command a full beat. */
  rhythm?: "default" | "compact";
}) {
  const pad =
    rhythm === "compact"
      ? "py-16 sm:py-20 lg:py-28"
      : "py-20 sm:py-28 lg:py-36 xl:py-44";

  return <div className={`gutter ${pad} ${className}`}>{children}</div>;
}

/**
 * The numbered rule that opens each section — a printed-journal device that
 * gives the page a sense of sequence.
 */
export function SectionLabel({
  index,
  label,
  tone = "paper",
  asHeading = false,
}: {
  index: string;
  label: string;
  tone?: Tone;
  /**
   * Promotes the label to the section's `h2`. Used where the section's
   * meaning lives in a statement rather than a headline, so the outline
   * still has a named entry for it.
   */
  asHeading?: boolean;
}) {
  const onInk = tone === "ink";
  const LabelTag = asHeading ? "h2" : "span";

  return (
    <div className="mb-12 flex items-baseline gap-4 sm:mb-16 sm:gap-6">
      <span
        className={`eyebrow shrink-0 ${onInk ? "text-signal-bright" : "text-signal"}`}
      >
        {index}
      </span>
      <LabelTag
        className={`eyebrow shrink-0 ${onInk ? "text-ash" : "text-graphite"}`}
      >
        {label}
      </LabelTag>
      <DrawRule
        className={`h-px flex-1 ${onInk ? "bg-rule-ink-strong" : "bg-rule-strong"}`}
      />
    </div>
  );
}
