import { profile } from "@/lib/content";

/* ============================================================================
   FOOTER
   ----------------------------------------------------------------------------
   Continues the ink surface from the close so the page ends on one field
   rather than introducing a final band. Carries a discreet marker noting this
   is a concept direction, which is the honest thing to have on the page while
   it is being presented as a proposal.
   ========================================================================== */

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-bone">
      <div className="gutter border-rule-ink flex flex-col gap-6 border-t py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.8125rem] tracking-[0.14em] uppercase">
          <span className="font-medium">{profile.firstName}</span>{" "}
          <span className="text-slate">{profile.lastName}</span>
        </p>

        <div className="text-slate flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <p className="eyebrow">Concept direction · 2026</p>
          <a
            href="#top"
            className="link-draw eyebrow hover:text-bone transition-colors"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
