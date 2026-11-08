"use client";

/* ============================================================================
   SITE HEADER  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Shared across every route. Name mark in Instrument Serif on the left, the
   page links in a translucent pill in the centre (the current page lit), and
   a cream Contact button on the right.

   It sits transparent over the hero; once the page scrolls it takes a dark,
   blurred backing so it stays legible over cream sections too. The scroll
   listener is passive and coalesced into a single rAF.

   Below 1024px the pill gives way to the Menu button. The mobile overlay is
   code-split and loaded on first intent, so its animation runtime never
   touches the critical path.
   ========================================================================== */

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { navigation, navContact } from "@/lib/content";
import { ActionButton } from "./action-button";

const MobileMenu = dynamic(
  () => import("./mobile-menu").then((mod) => mod.MobileMenu),
  { ssr: false },
);

/* Routes whose hero is light (Figma: /speaking). Over those, until the page
   scrolls, the header switches to dark type, a pale pill and the dark
   Contact button. Once scrolled it takes the usual dark backing. */
const LIGHT_HERO_ROUTES = new Set(["/speaking"]);

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  return path === "/"
    ? pathname === "/"
    : pathname === path || pathname.startsWith(`${path}/`);
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** Defers mounting (and therefore downloading) the overlay until wanted. */
  const [menuReady, setMenuReady] = useState(false);
  const frame = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [pathname]);

  const prefetchMenu = useCallback(() => setMenuReady(true), []);
  const close = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => {
    setMenuReady(true);
    setMenuOpen(true);
  }, []);

  const light = !scrolled && LIGHT_HERO_ROUTES.has(pathname);

  const linkClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3 py-2.5 font-sans text-[0.8125rem] tracking-[0.02em] uppercase transition-colors duration-200 xl:px-[1.15rem] xl:text-[0.9rem] ${
      light
        ? active
          ? "text-umber"
          : "text-umber/80 hover:text-umber"
        : active
          ? "text-cream"
          : "text-stone hover:text-cream"
    }`;

  return (
    <>
      {/* Keyboard users shouldn't have to tab the whole nav to reach content. */}
      <a
        href="#main"
        className="bg-cream text-umber sr-only font-sans text-sm focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-70 focus-visible:rounded-md focus-visible:px-4 focus-visible:py-3"
      >
        Skip to content
      </a>

      <header
        className={`${light ? "" : "on-ink"} fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-black/75 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="gutter flex h-[4.5rem] items-center justify-between gap-6 lg:h-[7rem]">
          {/* Name mark (Home) */}
          <Link
            href="/"
            className={`${light ? "text-umber" : "text-cream"} shrink-0 font-serif transition-colors duration-300 text-[1.75rem] leading-none whitespace-nowrap lg:pl-6 lg:text-[2.25rem] xl:pl-9 xl:text-[2.65rem]`}
          >
            Nelson T. Ajulo
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul
              className={`flex items-center rounded-full px-2 py-2 backdrop-blur-md transition-colors duration-300 xl:px-3 ${
                light ? "bg-[#d6d4cc]/70" : "bg-white/[0.14]"
              }`}
            >
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);

                if (item.children) {
                  /* Dropdown: opens on hover and keyboard focus, no JS state.
                     The parent ("Ventures") is a label, not a link: it only
                     opens the list. It reads as active on any child's page. */
                  const childActive = item.children.some((child) =>
                    isActive(pathname, child.href),
                  );
                  return (
                    <li key={item.label} className="group relative">
                      <button
                        type="button"
                        aria-haspopup="true"
                        className={`${linkClass(childActive)} inline-flex cursor-default items-center gap-1.5`}
                      >
                        {item.label}
                        <ChevronDown
                          className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>
                      <div className="invisible absolute top-full left-1/2 z-10 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                        <ul className="flex min-w-48 flex-col rounded-2xl border border-white/10 bg-black/90 p-2 backdrop-blur-xl">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="text-stone hover:text-cream block rounded-xl px-4 py-2.5 font-sans text-[0.8125rem] tracking-[0.02em] uppercase transition-colors hover:bg-white/[0.08]"
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
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={linkClass(active)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 xl:pr-9">
            {/* Wrapped: the button's own inline-flex would override `hidden`. */}
            <div className="hidden lg:block">
              <ActionButton
                href={navContact.href}
                variant={light ? "ink" : "light"}
              >
                {navContact.label}
              </ActionButton>
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={openMenu}
              onPointerEnter={prefetchMenu}
              onTouchStart={prefetchMenu}
              onFocus={prefetchMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`${light ? "text-umber" : "text-cream"} -mr-2 flex items-center gap-2 p-2 lg:hidden`}
            >
              <span className="font-sans text-xs tracking-[0.12em] uppercase">
                Menu
              </span>
              <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu">
        {menuReady ? <MobileMenu open={menuOpen} onClose={close} /> : null}
      </div>
    </>
  );
}
