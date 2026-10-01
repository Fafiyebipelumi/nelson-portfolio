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

/* The section's own surface colour, used to build the seam bleed. */
const toneColor: Record<Tone, string> = {
  paper: "var(--color-paper)",
  deep: "var(--color-paper-deep)",
  ink: "var(--color-ink)",
};

export function Section({
  id,
  tone = "paper",
  children,
  className = "",
  grain = false,
  seam = true,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Adds the paper-tooth texture. Reserved for ink surfaces. */
  grain?: boolean;
  /**
   * Soft-blends the seam with the section above by bleeding this section's
   * own colour up over the previous one, cross-fading the two surfaces
   * instead of butting them at a hard line. Disable for a section that sits
   * first on a page (nothing above to blend into).
   */
  seam?: boolean;
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
      {/* Seam bleed. Sits just above this section's top edge, over the tail of
          the previous one. Transparent at the top lets the previous surface
          show through, resolving to this section's colour at the seam — so any
          two neighbours cross-fade regardless of which tones they are, and
          same-tone neighbours show nothing. Later siblings paint above earlier
          ones, so no z-index bookkeeping is needed. */}
      {seam ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 -translate-y-full sm:h-28 lg:h-32"
          style={{
            background: `linear-gradient(to bottom, transparent, ${toneColor[tone]})`,
          }}
        />
      ) : null}
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
  /** "podcast" is a dark tone that uses the aqua accent instead of amber. */
  tone?: Tone | "podcast";
  /**
   * Promotes the label to the section's `h2`. Used where the section's
   * meaning lives in a statement rather than a headline, so the outline
   * still has a named entry for it.
   */
  asHeading?: boolean;
}) {
  const onInk = tone === "ink" || tone === "podcast";
  const indexColor =
    tone === "podcast"
      ? "text-airwave"
      : onInk
        ? "text-signal-bright"
        : "text-signal";
  const LabelTag = asHeading ? "h2" : "span";

  return (
    <div className="mb-12 flex items-baseline gap-4 sm:mb-16 sm:gap-6">
      <span className={`eyebrow shrink-0 ${indexColor}`}>{index}</span>
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
