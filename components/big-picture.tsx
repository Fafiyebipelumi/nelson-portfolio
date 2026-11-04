import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bigPicture } from "@/lib/content";
import { Section, SectionBody, SectionLabel } from "./section";
import { Reveal } from "./motion-primitives";

/* ============================================================================
   06 — AI, AFRICA & THE BIGGER PICTURE
   ----------------------------------------------------------------------------
   Establishes that the work is not only commercial. The homepage carries the
   short version and links to /ai-africa for the full argument. The AIFOD
   engagement is described in section 07 (Institutional context).
   ========================================================================== */

export function BigPicture() {
  return (
    <Section id="perspective" tone="ink" grain>
      <SectionBody>
        <SectionLabel index="06" label={bigPicture.eyebrow} tone="ink" />

        <Reveal>
          <h2 className="text-display text-bone max-w-5xl font-medium">
            {bigPicture.headline.before}
            <span className="text-signal-bright">
              {bigPicture.headline.emphasis}
            </span>
            {bigPicture.headline.after}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-6">
            {bigPicture.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={
                    i === 0
                      ? "text-lead text-bone"
                      : "text-ash text-base leading-relaxed sm:text-[1.0625rem]"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <Link
                href={bigPicture.cta.href}
                className="link-draw group text-signal-bright hover:text-bone mt-4 inline-flex items-baseline gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors"
              >
                {bigPicture.cta.label}
                <ArrowUpRight
                  className="size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          {/* Themes — plain text, hairline separated. No icons: small glyphs
              here would read as a feature grid, which is the opposite of the
              intent. */}
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="eyebrow text-slate mb-5">Working themes</p>
            <ul className="border-rule-ink grid grid-cols-1 border-t sm:grid-cols-2 lg:grid-cols-1">
              {bigPicture.themes.map((theme) => (
                <li
                  key={theme}
                  className="border-rule-ink text-ash border-b py-2.5 text-sm"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </SectionBody>
    </Section>
  );
}
