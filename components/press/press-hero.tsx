import type { CSSProperties } from "react";
import { pressPage } from "@/lib/content";
import { CopyButton } from "../copy-button";
import { GradientPill } from "../gradient-pill";
import { Stripes } from "../stripes";

/* ============================================================================
   PRESS — HERO  (Figma redesign, November 2026)
   ----------------------------------------------------------------------------
   Black with a cyan-blue glow at the top-left. Left: the serif "Press", the
   promise ("ready to copy"), the short bio and a Copy button that copies it.
   Right: the gradient pills in three right-aligned rows at their Figma widths
   (px at the 1440 frame, so vw here); the ones with arrows jump down the
   page. Fading lines into the bio band.
   ========================================================================== */

const GLOW = [
  "radial-gradient(24% 58% at 0% 0%, rgb(126 226 236 / 0.85) 0%, rgb(84 140 220 / 0.45) 40%, transparent 100%)",
  "radial-gradient(12% 45% at 0% 45%, rgb(60 120 150 / 0.4) 0%, transparent 100%)",
].join(", ");

export function PressHero() {
  const H = pressPage.hero;
  return (
    <section
      id="top"
      data-tone="ink"
      className="on-ink text-cream relative isolate overflow-hidden bg-black"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: GLOW }}
      />

      <div className="gutter-tight grid gap-12 pt-32 pb-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8 lg:pt-[10.1rem] lg:pb-[8.6rem]">
        <div>
          <h1
            className="animate-rise origin-left font-serif text-[clamp(4.5rem,10.3vw,10rem)] leading-[0.86] tracking-[-0.04em] [scale:0.88_1]"
            style={{ animationDelay: "0.12s" }}
          >
            {H.headline}
          </h1>
          <p
            className="animate-rise mt-7 font-sans text-[clamp(1.6rem,2.25vw,2.1rem)] leading-[1.02] font-semibold tracking-[-0.05em] lg:mt-6"
            style={{ animationDelay: "0.24s" }}
          >
            {H.subhead[0]} <br className="hidden sm:inline" />
            {H.subhead[1]}
          </p>
          <p
            className="animate-rise mt-4 max-w-[43rem] font-sans text-[clamp(1.0625rem,1.32vw,1.1875rem)] leading-[1.42] text-[#d6d2c7]"
            style={{ animationDelay: "0.34s" }}
          >
            {H.shortBio}
          </p>
          <div
            className="animate-rise mt-6"
            style={{ animationDelay: "0.44s" }}
          >
            <CopyButton text={H.shortBio} variant="light" />
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:mt-[2.1rem] lg:items-end lg:gap-[0.62vw]">
          {H.pills.map((row, r) => (
            <div
              key={r}
              className="flex flex-col gap-3 lg:flex-row lg:gap-[0.42vw]"
            >
              {row.map((pill, i) => (
                <div
                  key={`${pill.label}-${i}`}
                  className="animate-rise lg:w-[var(--pill-w)]"
                  style={
                    {
                      "--pill-w": `${(pill.width / 1440) * 100}vw`,
                      animationDelay: `${0.4 + (r * 2 + i) * 0.07}s`,
                    } as CSSProperties
                  }
                >
                  <GradientPill
                    label={pill.label}
                    from={pill.from}
                    to={pill.to}
                    arrow={"arrow" in pill ? pill.arrow : undefined}
                    href={"href" in pill ? pill.href : null}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Stripes from="#000" to="#5e5a51" fade className="relative z-10" />
    </section>
  );
}
