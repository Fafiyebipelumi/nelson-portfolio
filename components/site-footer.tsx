import Link from "next/link";
import type { ReactNode } from "react";
import { footerListen, footerSocial, navigation } from "@/lib/content";
import { ListenIcon, SocialIcon } from "./footer-icons";

/* ============================================================================
   FOOTER  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Dark, shared across every route. Top row: serif name with the social icons
   under it, the section links in the middle, and the podcast platforms on
   the right. Then a dashed rule and the full name set huge in engraved
   outline type across the width.

   Icons whose href is empty in content.ts (handles not confirmed yet) render
   without a link.
   ========================================================================== */

const links = navigation.filter((item) => item.href !== "/");

export function SiteFooter() {
  return (
    <footer className="bg-umber text-cream overflow-hidden">
      <div className="gutter pt-16 sm:pt-20 lg:pt-[5.5rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start lg:gap-8">
          {/* Name + social */}
          <div>
            <Link
              href="/"
              className="inline-block origin-left font-serif text-[2.4rem] leading-none [scale:0.88_1] lg:text-[2.65rem]"
            >
              Nelson T. Ajulo
            </Link>
            <ul className="mt-5 flex items-center gap-2.5" aria-label="Social">
              {footerSocial.map((item) => (
                <li key={item.id} className="size-7">
                  <IconLink href={item.href} label={item.label}>
                    <SocialIcon id={item.id} />
                  </IconLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Section links */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-start gap-x-5 gap-y-3 lg:pt-1.5">
              {links.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    /* A group label ("Ventures"), not a link. */
                    <span className="text-stone font-sans text-[0.9375rem] tracking-[-0.01em] uppercase lg:text-base">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-stone hover:text-cream font-sans text-[0.9375rem] tracking-[-0.01em] uppercase transition-colors lg:text-base"
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children ? (
                    <ul className="mt-2.5 space-y-1.5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-stone hover:text-cream font-sans text-[0.875rem] transition-colors"
                          >
                            {child.label.replace(" Ventures", "")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          {/* Podcast platforms */}
          <ul
            className="flex items-center gap-2.5 lg:justify-end lg:pt-2"
            aria-label="Listen to BEFORE"
          >
            {footerListen.map((item) => (
              <li key={item.id} className="size-8">
                <IconLink href={item.href} label={item.label}>
                  <ListenIcon id={item.id} />
                </IconLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Dashed rule */}
        <div
          aria-hidden="true"
          className="mt-20 h-px lg:mt-[9.5rem]"
          style={{
            background:
              "repeating-linear-gradient(to right, #5e5a51 0 10px, transparent 10px 20px)",
          }}
        />

        {/* Engraved name */}
        <p
          aria-hidden="true"
          className="footer-engrave mt-6 flex justify-between font-serif text-[14.6vw] leading-[0.95] whitespace-nowrap uppercase lg:mt-8"
        >
          <span>Nelson</span>
          <span>T.</span>
          <span>Ajulo</span>
        </p>
      </div>
    </footer>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  if (!href) {
    return (
      <span role="img" aria-label={label} title={`${label} (coming soon)`} className="block size-full">
        {children}
      </span>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      aria-label={label}
      className="block size-full transition-transform duration-200 hover:-translate-y-0.5"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
