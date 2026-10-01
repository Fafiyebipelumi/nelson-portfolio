import type { ReactNode } from "react";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   PAGE HEADER
   ----------------------------------------------------------------------------
   The masthead for interior (paper) pages. Carries the top padding needed to
   clear the fixed site header, and the standard eyebrow + display-title + lead
   rhythm shared across About, Speaking, Press, Contact and Writing.
   ========================================================================== */

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section data-tone="ink" className="on-ink bg-ink text-bone">
      <div className="gutter pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-48">
        <Reveal>
          <p className="eyebrow text-signal-bright">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-display text-bone mt-6 max-w-4xl font-medium">
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={0.1}>
            <p className="text-lead text-ash mt-8 max-w-2xl">{lead}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
