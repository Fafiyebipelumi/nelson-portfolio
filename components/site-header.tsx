"use client";

/* ============================================================================
   SITE HEADER
   ----------------------------------------------------------------------------
   Shared across every route (rendered once in the root layout). It starts
   transparent over an ink hero with light type, then takes on a translucent
   bar — ink or paper — matching whichever surface is passing beneath it. That
   surface-matching is the only reason the bar needs to be a client component,
   and it is driven by a passive scroll listener coalesced into a single rAF.

   Because the header persists across client-side navigations, the ink-section
   bounds are re-measured whenever the route changes (`pathname`), otherwise a
   new page would inherit the previous page's tone map.

   The mobile overlay is code-split and imported on first intent, so the
   animation runtime it needs never touches the critical path — or desktop.
   ========================================================================== */

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { navigation, profile } from "@/lib/content";

const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => mod.MobileMenu),
  { ssr: false },
);

export function SiteHeader() {
  /** True once the hero has scrolled away and the bar needs a background. */
  const [pinned, setPinned] = useState(false);
  /** Tone of the section currently passing under the bar. */
  const [overInk, setOverInk] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  /** Defers mounting (and therefore downloading) the overlay until wanted. */
  const [menuReady, setMenuReady] = useState(false);
  const frame = useRef(0);
  const inkRanges = useRef<Array<[number, number]>>([]);
  const pathname = usePathname();

  useEffect(() => {
    /* The site alternates paper and ink surfaces, so a single fixed bar style
       cannot work throughout — a light bar stranded over an ink section reads
       as a rendering fault. Ink section bounds are measured up front (and on
       resize / route change) so the scroll handler only ever does arithmetic,
       never a layout read, on the way past. */
    const measure = () => {
      inkRanges.current = Array.from(
        document.querySelectorAll<HTMLElement>('[data-tone="ink"]'),
      ).map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        return [top, top + el.offsetHeight] as [number, number];
      });
    };

    const read = () => {
      frame.current = 0;
      const y = window.scrollY;
      /* Sample just below the bar's own bottom edge. */
      const probe = y + 72;
      setPinned(y > window.innerHeight * 0.8);
      setOverInk(
        inkRanges.current.some(([top, bottom]) => probe >= top && probe < bottom),
      );
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };

    const onResize = () => {
      measure();
      read();
    };

    /* Wait a frame after a route change so the incoming page has laid out
       before its ink sections are measured. */
    const settle = window.requestAnimationFrame(() => {
      measure();
      read();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [pathname]);

  /* Warm the overlay chunk on intent, so the tap itself is instant. */
  const prefetchMenu = useCallback(() => setMenuReady(true), []);
  const close = useCallback(() => setMenuOpen(false), []);

  const openMenu = useCallback(() => {
    setMenuReady(true);
    setMenuOpen(true);
  }, []);

  /* Type follows the surface underneath, not the scroll position. */
  const light = overInk;

  const surface = !pinned
    ? "border-transparent"
    : overInk
      ? "border-rule-ink bg-ink/80 border-b backdrop-blur-xl"
      : "border-rule bg-paper/85 border-b backdrop-blur-xl";

  return (
    <>
      {/* Keyboard users shouldn't have to tab the whole nav to reach content. */}
      <a
        href="#main"
        className="bg-ink text-bone sr-only font-mono text-xs tracking-[0.14em] uppercase focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-70 focus-visible:px-4 focus-visible:py-3"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${surface} ${
          light ? "on-ink" : ""
        }`}
      >
        <div className="gutter flex h-16 items-center justify-between sm:h-20">
          {/* Name mark (Home) */}
          <Link
            href="/"
            className={`font-mono text-[0.8125rem] tracking-[0.14em] uppercase transition-colors duration-500 ${
              light ? "text-bone" : "text-charcoal"
            }`}
          >
            <span className="font-medium">{profile.firstName}</span>{" "}
            <span className={light ? "text-slate" : "text-mute"}>
              {profile.lastName}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-10">
              {navigation.map((item) => {
                const linkClass = `link-draw font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors duration-300 ${
                  light
                    ? "text-ash hover:text-bone"
                    : "text-graphite hover:text-charcoal"
                }`;

                if (item.children) {
                  /* Dropdown: opens on hover and on keyboard focus-within, so
                     it works without JavaScript state. */
                  return (
                    <li key={item.label} className="group relative">
                      <button
                        type="button"
                        aria-haspopup="true"
                        className={`${linkClass} flex items-center gap-1.5`}
                      >
                        {item.label}
                        <ChevronDown
                          className="size-3 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        className={`invisible absolute top-full left-1/2 z-10 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100`}
                      >
                        <ul
                          className={`flex min-w-44 flex-col border p-2 backdrop-blur-xl ${
                            light
                              ? "border-rule-ink bg-ink/90"
                              : "border-rule bg-paper/95"
                          }`}
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={`block px-3 py-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors ${
                                  light
                                    ? "text-ash hover:bg-ink-soft hover:text-bone"
                                    : "text-graphite hover:bg-paper-deep hover:text-charcoal"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link href={item.href ?? "/"} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={openMenu}
            onPointerEnter={prefetchMenu}
            onTouchStart={prefetchMenu}
            onFocus={prefetchMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`-mr-2 flex items-center gap-2 p-2 md:hidden ${
              light ? "text-bone" : "text-charcoal"
            }`}
          >
            <span className="eyebrow">Menu</span>
            <Menu className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id="mobile-menu">
        {menuReady ? <MobileMenu open={menuOpen} onClose={close} /> : null}
      </div>
    </>
  );
}
