import Link from "next/link";
import { footerNav, profile } from "@/lib/content";

/* ============================================================================
   FOOTER
   ----------------------------------------------------------------------------
   Ink surface, shared across every route. Carries the full site cross-links
   (Press lives here rather than in the primary nav, per brief §3) and the name
   mark. Continues the ink close on the homepage so the page ends on one field.
   ========================================================================== */

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-bone">
      <div className="gutter border-rule-ink border-t py-14 sm:py-16">
        {/* Cross-links */}
        <nav aria-label="Footer" className="mb-12">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-draw text-ash hover:text-bone font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-rule-ink flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="font-mono text-[0.8125rem] tracking-[0.14em] uppercase"
          >
            <span className="font-medium">{profile.firstName}</span>{" "}
            <span className="text-slate">{profile.lastName}</span>
          </Link>

          <div className="text-slate flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <p className="eyebrow">Copyright &copy; 2026</p>
            <a href="#top" className="link-draw eyebrow hover:text-bone transition-colors">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
