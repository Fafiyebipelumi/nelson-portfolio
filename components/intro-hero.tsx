import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Stripes } from "./stripes";

/* ============================================================================
   INTRO HERO  (redesign system, November 2026)
   ----------------------------------------------------------------------------
   The black hero of the redesign's inner pages (Writing, Contact) for pages
   that have no Figma frame of their own: /ventures, /ai-africa, an essay and
   the 404. Black with an edge glow (see glows.ts), an optional back link and
   grey pill, the serif title with the house squeeze and stroke, a sand lead,
   then any actions. Closes on the fading lines into the next dark section,
   or on the solid stripes into a cream one (`into`).
   ========================================================================== */

export function IntroHero({
  glow,
  back,
  pill,
  title,
  lead,
  align = "left",
  into = "dark",
  children,
}: {
  /** CSS background from glows.ts. */
  glow: string;
  back?: { label: string; href: string };
  pill?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** What follows: a dark section (fading lines) or a cream one. */
  into?: "dark" | "cream";
  children?: ReactNode;
}) {
  const center = align === "center";
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: glow }} />

      <div
        className={`gutter-tight flex flex-col pt-32 pb-20 lg:pt-[11rem] lg:pb-[7.5rem] ${
          center ? "items-center text-center" : "items-start xl:pl-[6.5rem]"
        }`}
      >
        {back ? (
          <Link
            href={back.href}
            className="animate-rise text-stone hover:text-cream group mb-8 inline-flex items-center gap-2 font-sans text-[0.9375rem] font-medium transition-colors"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
            {back.label}
          </Link>
        ) : null}

        {pill ? (
          <p
            className="animate-rise inline-flex rounded-full bg-[#3a3833] px-3.5 py-1.5 font-sans text-[0.8125rem] font-medium tracking-[-0.01em]"
            style={{ animationDelay: "0.08s" }}
          >
            {pill}
          </p>
        ) : null}

        <h1
          className={`animate-rise mt-6 max-w-[62rem] font-serif text-[clamp(2.9rem,6.4vw,6.4rem)] leading-[0.98] tracking-[-0.035em] [scale:0.88_1] [-webkit-text-stroke:0.6px_currentColor] ${
            center ? "" : "w-[calc(100%/0.88)] origin-left"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>

        {lead ? (
          <div
            className="animate-rise mt-7 max-w-[48rem] font-sans text-[1.0625rem] leading-[1.45] text-[#d6d2c7] lg:mt-9 lg:text-[1.1875rem]"
            style={{ animationDelay: "0.3s" }}
          >
            {lead}
          </div>
        ) : null}

        {children ? (
          <div className="animate-rise mt-9 lg:mt-11" style={{ animationDelay: "0.42s" }}>
            {children}
          </div>
        ) : null}
      </div>

      {into === "cream" ? (
        <Stripes from="#000" to="var(--color-cream)" className="relative z-10" />
      ) : (
        <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
      )}
    </section>
  );
}
